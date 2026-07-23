
import Data from "$lib/server/models/data.js";
export async function load({ fetch }) {
  const result = await Data.aggregate([
    {
      $group: {
        _id: { name: "$name", code: "$code" },
      },
    },
    { $project: { _id: 0, name: "$_id.name", code: "$_id.code" } },
  ]);
  //  console.log(faculties);
  //  console.log(facultyList)
  const names = await result.map((a) => a.name);
  const codes = await result.map((a) => a.code);
  return { names, codes }
}
