import * as net from 'net'
import * as crypto from 'crypto'
import * as path from 'path'

enum Opcode {
  HANDSHAKE = 0,
  FRAME = 1,
  CLOSE = 2
}

interface ActivityPayload {
  cmd: 'SET_ACTIVITY'
  args: {
    pid: number
    activity: {
      details?: string
      state?: string
      timestamps?: { start?: number; end?: number }
      assets?: {
        large_image?: string
        large_text?: string
        small_image?: string
        small_text?: string
      }
      buttons?: Array<{
        label: string
        url: string
      }>
    }
  }
  nonce: string
}

class DiscordPresence {
  private clientId: string
  private socket: net.Socket | null = null
  private reconnectTimeout: NodeJS.Timeout | null = null

  constructor(clientId: string) {
    this.clientId = clientId
  }

  private getSocketPath(): string {
    if (process.platform === 'win32') {
      return '\\\\?\\pipe\\discord-ipc-0'
    }

    const envs = ['XDG_RUNTIME_DIR', 'TMPDIR', 'TMP', 'TEMP']
    for (const env of envs) {
      if (process.env[env]) {
        return path.join(process.env[env]!, 'discord-ipc-0')
      }
    }
    return '/tmp/discord-ipc-0'
  }

  private encodePacket(op: Opcode, data: object): Buffer {
    const payload = JSON.stringify(data)
    const payloadLength = Buffer.byteLength(payload)

    const header = Buffer.alloc(8)
    header.writeInt32LE(op, 0)
    header.writeInt32LE(payloadLength, 4)

    return Buffer.concat([header, Buffer.from(payload)])
  }

  public connect(): void {
    if (this.socket) return

    const socketPath = this.getSocketPath()
    this.socket = net.createConnection(socketPath)

    this.socket.on('connect', () => {
      console.log('[Discord RPC] Connesso al socket nativo!')

      const handshake = { v: 1, client_id: this.clientId }
      this.socket?.write(this.encodePacket(Opcode.HANDSHAKE, handshake))

      setTimeout(() => this.updateActivity(), 1000)
    })

    this.socket.on('data', (data: Buffer) => {
      console.log(data)
    })

    this.socket.on('error', (err: Error) => {
      console.log(`[Discord RPC] Discord disconnesso o non avviato: ${err.message}`)
      this.cleanup()

      this.reconnectTimeout = setTimeout(() => this.connect(), 15000)
    })
  }

  public updateActivity(
    details: string = 'Giocando a mamikame',
    state: string = 'Menu principale'
  ): void {
    if (!this.socket || this.socket.destroyed) return

    const activityPayload: ActivityPayload = {
      cmd: 'SET_ACTIVITY',
      args: {
        pid: process.pid,
        activity: {
          details: details,
          state: state,
          timestamps: {
            start: Date.now()
          },
          assets: {
            large_image: 'mamikame_icon_large',
            large_text: 'mamikame',
            small_image: 'mamikame_icon_small',
            small_text: 'Online'
          }
        }
      },
      nonce: crypto.randomUUID()
    }

    this.socket.write(this.encodePacket(Opcode.FRAME, activityPayload))
  }

  public disconnect(): void {
    this.cleanup()
    if (this.socket && !this.socket.destroyed) {
      this.socket.write(this.encodePacket(Opcode.CLOSE, {}))
      this.socket.end()
    }
  }

  private cleanup(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    this.socket = null
  }
}

export default DiscordPresence
