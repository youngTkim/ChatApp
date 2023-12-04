import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as sch } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //자동으로 등록일, 수정일을 넣어줍니다.
  collection: 'userCollection',
  _id: true, //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class MyDocument extends Document {
  @Prop({ type: sch.Types.String })
  id: string;

  @Prop({ type: sch.Types.String })
  password: string;

  @Prop({ type: sch.Types.Boolean })
  online: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(MyDocument);
export type MyType = MyDocument & Document;
