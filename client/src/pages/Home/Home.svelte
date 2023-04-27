<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/globalStore";

    let username = '';
    let isLoggedIn = false;


    onMount(async () => {
    const response = await fetch($BASE_URL + "/loggedin", {
      credentials: 'include'
    });
    const data = await response.json();
    console.log(data);
    if (data.isAuth) {
        isLoggedIn = true;
        username = data.name;
        }
    });

    // Tried two different methods to get my session working in the frontend, but couldn't make it. Not sure where the problem is.

    /* 
    async function getSessionData() {
    const response = await fetch(BASE_URL + "/loggedin", {
        credentials: 'include',
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });
    if(response.ok){
        const data = await response.json();
        if (data.isAuth) {
        isLoggedIn = true;
        username = data.name;
        }
        }
    }
    getSessionData();
    */
</script>

<div class="container">
{#if isLoggedIn = true}
    <h1>Please login</h1>
{:else}
    <h1>Welcome to the homepage, {username}</h1>
{/if}
</div>



<style>
    .container {
    display: flex; 
    justify-content: center;
    align-items: center; 
    height: 100vh;
  }
</style>