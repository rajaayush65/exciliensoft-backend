import mongoose, { Document, Schema } from 'mongoose';

interface ExampleModel extends Document {
  name: string;
}

const ExampleSchema = new Schema({
  name: { type: String, required: true },
});

const Example = mongoose.model<ExampleModel>('Example', ExampleSchema);

export default Example;
