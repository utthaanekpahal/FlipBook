import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function updateUrls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await mongoose.connection.db.collection("books").updateMany(
      { fileUrl: { $regex: "^http://" } },
      [
        {
          $set: {
            fileUrl: {
              $replaceOne: {
                input: "$fileUrl",
                find: "http://",
                replacement: "https://"
              }
            }
          }
        }
      ]
    );

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

updateUrls();