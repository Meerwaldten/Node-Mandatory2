<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../store/globalStore";

    let email = '';
    let username = '';
    let password = '';

    async function handleSubmit() {
        if(!email || !username || !password){
            alert('Please fill in the form!');
        };
        const response = await fetch($BASE_URL + "/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });
        if (response.ok) {
            alert("You've signed up!");
            navigate("/");
        }else {
            alert("Signup failed, try again");
            navigate("/signup");
        }
    };
</script>

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" bind:value={email} id="email">

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