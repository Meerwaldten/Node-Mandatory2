<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../store/globalStore";
    
    async function handleLogout() {
      const response = await fetch($BASE_URL + "/logout", { 
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        navigate('/login');
      }
    }
</script>
  
<nav>
    <button on:click={handleLogout}>Logout</button>
</nav>
  