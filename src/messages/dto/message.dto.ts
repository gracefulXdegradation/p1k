export class MessageDto {
  text: string;

  // TODO extract into a separate class
  from: {
    _id: string;
    username: string;
  }
  to: {
    _id: string;
    username: string;
  }
}
