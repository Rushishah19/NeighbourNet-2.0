import io from "socket.io-client";

class SocketService {
  private socket: any;

  connect(url: string) {
    this.socket = io(url);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();
