<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../store/globalStore.js";
    import showToastify from "../store/Toastify.js";

    let username = '';
    let password = '';
    
    async function handleSubmit() {
      if (!username || !password) {
        showToastify('Please fill in all fields');
      }

      
      const response = await fetch($BASE_URL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        showToastify("Login successful, redirecting");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        showToastify("Login failed, try again");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
</script>

  

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="username">Username:</label>
        <input type="text" bind:value={username} id="Username">
    
        <label for="password">Password:</label>
        <input type="password" bind:value={password} id="password">
    
        <button type="submit">Submit</button>
     </form>
</div>

  
<style>
    input{
      display: block; 
      margin-bottom: 1rem;
    }
    .form-container {
    display: flex; 
    justify-content: center;
    align-items: center; 
    height: 100vh;
    }
</style>