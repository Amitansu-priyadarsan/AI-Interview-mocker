/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:OfZM3y8vNXAG@ep-little-feather-a50vtcrk.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
  