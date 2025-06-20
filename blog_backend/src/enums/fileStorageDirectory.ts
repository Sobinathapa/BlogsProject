/**
 * @description FileStorageDirectory
 * @enum {string}
 * @readonly
 * @example
 * import FileStorageDirectory from "./app/enums/fileStorageDirectory.js";
 * FileStorageDirectory.FILE_UPLOAD_PATH // "public"
 * @module fileStorageDirectory
 * @exports FileStorageDirectory
 */

enum FileStorageDirectory {
  FILE_UPLOAD_PATH = "uploads",
  AVATAR = "avatars",
  BLOG = "blogs",
}

export default FileStorageDirectory;
