import moment from 'moment'

let dummyData =
{
  "lanes": [
    {
      "id": "submitted",
      "title": "Submitted",
      "color": "#D93954",
      "cards": [
        {
          "id": "120",
          "requestor": "Vivian LH Wang",
          "color": "#D93954",
          "status": "submitted",
          "content": {
            "subject": "My new Subject 1",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "lastModified": moment('2020-05-20').format()
          }
        },{
          "id": "202",
          "requestor": "Vivian LH Wang",
          "color": "#D93954",
          "status": "submitted",
          "content": {
            "subject": "A Subject about test my custom mutiple sort 3",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        }
      ]
    },
    {
      "id": "assgined",
      "title": "Assgined",
      "color": "#2A5477",
      "cards": [
        {
          "id": "121",
          "requestor": "Vivian LH Wang",
          "color": "#2A5477",
          "status": "assgined",
          "content": {
            "subject": "Enhance on secure file upload control",
            "dueDate": moment('2021-05-18').format(),
            "assignee": "Andrew KM Leung",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "lastModified": moment('2020-05-20').format()
          }
        },{
          "id": "200",
          "requestor": "Fred FH Lau",
          "color": "#2A5477",
          "status": "assgined",
          "content": {
            "subject": "My Subject about test my custom sort 1",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        },{
          "id": "116",
          "requestor": "Demeter CC Lee",
          "color": "#2A5477",
          "status": "assgined",
          "content": {
            "subject": "My new Subject 2",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        },{
          "id": "201",
          "requestor": "Fred FH Lau",
          "color": "#2A5477",
          "status": "assgined",
          "content": {
            "subject": "My Subject about test my custom filter 1",
            "dueDate": moment().format(),
            "assignee": "Siu Ming",
            "type": "Board",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        }
      ]
    },
    {
      "id": "pendingForClose",
      "title": "Pending for Close",
      "color": "#2A9D8F",
      "cards": [
        {
          "id": "103",
          "requestor": "Jimmy HW Ip",
          "color": "#2A9D8F",
          "status": "pendingForClose",
          "content": {
            "subject": "Unable to go to word from first character",
            "dueDate": moment('2021-04-08').format(),
            "assignee": "Andrew KM Leung",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "lastModified": moment('2020-05-20').format()
          }
        },{
          "id": "117",
          "requestor": "Demeter CC Lee",
          "color": "#2A9D8F",
          "status": "pendingForClose",
          "content": {
            "subject": "My new Subject 3",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        }
      ]
    },
    {
      "id": "completed",
      "title": "Completed",
      "color": "#D04A02",
      "cards": [
        {
          "id": "101",
          "requestor": "Ashley Ying",
          "color": "#D04A02",
          "status": "completed",
          "content": {
            "subject": "My new Subject 4",
            "dueDate": moment().format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-10-21').format()
          }
        },{
          "id": "102",
          "requestor": "Ashley Ying",
          "color": "#D04A02",
          "status": "completed",
          "content": {
            "subject": "My new Subject 5",
            "dueDate": moment('2020-10-21').format(),
            "assignee": "Fred Lau",
            "type": "Wishlist",
            "territory": "PwC Mekong",
            "dmVersion": "4.19",
            "description": "Test new Lorem Ipsum long long long long long long long",
            "lastModified": moment('2020-05-20').format()
          }
        }
      ]
    }
  ]
}

export default dummyData;