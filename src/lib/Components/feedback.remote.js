import { form } from "$app/server";
import * as v from "valibot";
import Feedback from "$lib/server/models/feedback";

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  message: v.pipe(v.string(), v.nonEmpty())
})
export const submitFeedback = form(schema, async (data) => {
  const result = await Feedback.insertOne(data);
  return {success: true, id: result._id.toString()}
})
