import routing from '../../services/routing.js';
import Utils        from './../../services/Utils.js'

let getReq = async (resource, id = "") => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/`+ resource +`/`+ id,  options)
       const json = await response.json();
        console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostUsers = async (data, id) => {
    const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {
       const response = await fetch(`http://localhost:3000/interviews/` + id,  options)
       const json = await response.json();
       console.log(json)
       console.log(response.status)
       if (response.status == 401) {
           var o = json;
           for (var key in o) {
               if (o.hasOwnProperty(key)) {
                   alert(key, o[key]);
               }
           }
       }
       json["status"] = response.status;
       return json
   } catch (err) {
       alert(err)
       console.log('Error getting documents', err)
   }
}

let EditInterview = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let allusers = await getReq('participants')
        let interview = await getReq('interviews', request.id)
        console.log(interview)
        let start = interview.start_time.substr(0, interview.start_time.length - 1);
        let end = interview.end_time.substr(0, interview.end_time.length - 1);
        return `
        <form >
          <div>
              Title
              <input class="form-control" type="text"  name="title" id="title" value = ${interview.title}>
          </div>
              <br/>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="start_time" id="start_time" value = ${start}>
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="end_time" id="end_time" value = ${end}>
            </div>

            <br/>
            <div>
                Choose Participants
                    ${allusers.map(user => {
                        <input type="checkbox" name="interviewers[]" value="${user.id}">

                    } )}
            </div>

            <button type="button" id="editbutton">Edit</button>
        <form>`
    }


    , after_render: async () => {
        document.getElementById("editbutton").addEventListener ("click",  async () => {
            let title =            document.getElementById("title").value;
            let startTime     = document.getElementById("start_time").value;
            let endTime      = document.getElementById("end_time").value;
            let participants[]  = document.getElementById("user_id").value;
            let request = Utils.parseRequestURL()
            let data = {
                    "title"      :title,
                    "start_time" : startTime,
                    "end_time" : endTime,
                    "id" : request.id


            };
            console.log(data);
            let response = await PostUsers(data, request.id);
            if (response["status"] != 401)
            routing.render("Interviews")

        })
    }
}

export default EditInterview
