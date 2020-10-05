import routing from '../../services/routing.js';
import Utils        from '../../services/Utils.js'
let DeleteInterview = async (resource, id) => {
    const options = {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/` + resource + `/` + id, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let getReq = async (resource, id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/` + resource + `/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let InterviewShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let interview = await getReq('interviews', request.id)
        return /*html*/`
            <section class="section">
                <h1> Interview Title : ${interview.title}</h1>
                <h1> Interview Start time : ${interview.start_time}</h1>
                <p> Interview End time : ${interview.end_time} </p>

                <button type="button" id="delete">Delete</button>
            </section>
        `
    }
    , after_render: async () => {
        document.getElementById("delete").addEventListener ("click", async () => {

            let request = Utils.parseRequestURL()
            let response = await DeleteInterview("interviews", request.id);
            routing.render('Interviews')
        })
    }
}

export default InterviewShow;
