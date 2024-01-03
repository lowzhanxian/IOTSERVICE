
import { ref ,computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'
const getTodos =() => {
    const route = useRoute();
    const router = useRouter();


    const deviceId=computed(()=>route.params.id)
    // console.log(deviceId.value)

    const state = ref({
      newName:'',
      newserialNumber:'',
      newLocation:'',
      newtype:'',
      newstatus:'',

        todos:{}
      })


      //get
      const GetAllTodos = async() => {
        try{
            await fetch("http://localhost:3000/device")
            .then(res => res.json())
            .then(data => {
               state.value.devices = data
               console.log(state.value.devices)

            })
        }
        catch(error){
            console.log(error)
        }
      }
//add new details
      const newTodo = async () => { 
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify(
            {
              name: state.value.newName,
            serialNumber: state.value.newserialNumber,
            location:state.value.newLocation,
            type:state.value.newtype,
            status:state.value.newstatus,
            }
          )
        };

        try {
          const response = await fetch("http://localhost:3000/device/new", requestOptions);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data);
          
          return 'Device added successfully !' ;
          
        
          // await GetAllTodos();
        } catch (error) {
          console.error('Failed to add new device:', error);
          throw error
        
        
        }
      }



      //delete 
      const deleteTodo = (_id) => {
        fetch("http://localhost:3000/device/delete/" + _id, { method: "DELETE"})
          .then(GetAllTodos())
      }


      //edit
      const editTodo = async (deviceId) => { 
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            location: state.value.newLocation,
            status: state.value.newstatus
          }) 
        }
      
        try {
          const response = await fetch("http://localhost:3000/device/update/" + deviceId, requestOptions);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json(); 
          console.log(data);
      
          // Update the success message state here
           return 'Device updated successfully!';
      
          // Redirect after successful update
        } catch (error) {
          console.error('Edit failed:', error);
          throw error
        }
      }
      

      const device = ref({})
      const GetSpecificTodo=async() => {
        fetch("http://localhost:3000/device")
        .then(res => res.json())
        .then(data => {
          device.value = data.find(t => t._id === deviceId.value);
        })
        .catch(error => {
          console.error('Failed to fetch the device:', error);
        })}
      return{
        device,
        deviceId,
        GetSpecificTodo,
        state,
        GetAllTodos, 
        newTodo,
        deleteTodo,
        editTodo,
        
      }
}

export default getTodos