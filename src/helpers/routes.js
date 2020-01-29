const serverUrl = 'http://localhost:8080'
export const toDoItemsApiUrl = id =>
id ? `${serverUrl}/todo_items/${id}` : `${serverUrl}/allitems`