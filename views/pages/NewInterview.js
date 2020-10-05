import routing from '../../services/routing.js';
import Utils        from '../../services/Utils.js'
let getUsers = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/participants/`,  options)
       const json = await response.json();
        console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostUsers = async (data) => {
    const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {
        const response = await fetch(`http://localhost:3000/interviews/`,  options)
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
       console.log('Error getting documents', err)
   }
}

let NewInterview = {


    render: async () => {
        let allusers = await getUsers()

        return `
        <form>
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
            <button type="button" id="newinterviewbutton">CREATE</button>
        <form>`
    }


    , after_render: async () => {
        document.getElementById("newinterviewbutton").addEventListener ("click",  async () => {
            let title =            document.getElementById("title").value;
            let startTime     = document.getElementById("start_time").value;
            let endTime      = document.getElementById("end_time").value;
            let participants[]  = document.getElementById("user_id").value;

            let data = {
                    "title"      :title
                    "start_time" : startTime,
                    "end_time" : endTime,

            };
            console.log(data);
            let response = await PostUsers(data);
            if (response["status"] != 401)
            routing.render("Interviews")

        })
    }
}

export default NewInterview
