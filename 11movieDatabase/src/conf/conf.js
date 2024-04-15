const conf = {
    appwrite_url: String(process.env.APP_WRITE_URL),
    appwrite_project_id: String(process.env.PROJECT_ID),
    appwrite_database_id: String(process.env.DATABASE_ID),
    appwrite_collection_id: String(process.env.COLLECTION_ID),
    appwrite_bucket_id: String(process.env.BUCKET_ID),
}

export default conf