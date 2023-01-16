import React from "react";
import { useForm, Schema } from "react-jform";

const a: { schema: Schema<any>; defaultValues: any } = {
  schema: {
    fields: { type: { type: "string", defaultValue: "1234" } },
  },
  defaultValues: { type: "1234" },
};

function App() {
  const { register } = useForm(a);

  return (
    <form>
      <input {...register("type")} />
      <div className="App">1</div>
    </form>
  );
}

export default App;
