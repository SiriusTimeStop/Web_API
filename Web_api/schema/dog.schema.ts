export const dog = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "Dog",
  "description": "An dog in the blog",
  "type": "object",
  "properties": {
    "dogname": {
      "description": "The name of the dog",
      "type": "string"
    },
    "maintext": {
      "description": "The basic text of the dog",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of dog",
      "type": "string"
    },
    "imageurl": {
      "description": "URL for main image to show in dog",
      "type": "uri"
    },
    "published": {
      "description": "Is the dog post published or not",
      "type": "boolean"
    },
    "locationid": {
      "description": "Location ID of the dog",
      "type": "string"
    },
    "staffid": {
      "description": "Staff ID of the published",
      "type": "integer",
      "minimum": 0
    },
    "description": {
      "description": "description of dog in more details",
      "type": "string"  
    }
  },
  "required": ["dogname", "maintext", "staffid"]
}