import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getMovie(uniqueID) {
        try {
            return await this.databases.getDocument(conf.appwrite_database_id, conf.appwrite_collection_id, uniqueID)
        } catch (error) {
            console.log("Appwrite service :: getMovie() :: ", error);
            return false
        }
    }

    async getMovies(keywords = "") {
        try {
            return await this.databases.listDocuments(
                    conf.appwrite_database_id,
                    conf.appwrite_collection_id,
                    keywords.length > 0 ? [Query.contains("movie_title", keywords)] : undefined
                )
        } catch (error) {
            console.log("Appwrite service :: getMovies() :: ", error);
            return false
        }
    }

    async addMovie({movie_title, movie_director, movie_plot, featured_image, userId, movie_year, movie_cast}) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                ID.unique(),
                {movie_title, movie_director, movie_plot, featured_image, userId, movie_cast, movie_year}
            )
        } catch (error) {
            console.log("Appwrite service :: addMovie() :: ", error);
            return false
        }
    }

    async updateMovie(uniqueID, {movie_title, movie_director, movie_plot, featured_image, movie_year, movie_cast}) {
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                uniqueID,
                {movie_title, movie_director, movie_plot, featured_image, userId, movie_cast, movie_year}
            )
        } catch (error) {
            console.log("Appwrite service :: updateMovie() :: ", error);
            return false
        }
    }

    async deleteMovie(uniqueID) {
        try {
            await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                uniqueID
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteMovie() :: ", error);
            return false
        }
    }

    // Storage Service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwrite_bucket_id,
                fileId
            ).href
        } catch (error) {
            console.log("Appwrite service :: getFilePreview() :: ", error);
            return false
        }
    }
}

const service = new Service();

export default service;
