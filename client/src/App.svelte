<script>
  import {Router, Route, Link} from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import Login from "./pages/Login/Login.svelte";
  import Logout from "./pages/Logout/Logout.svelte";
  import Signup from "./pages/Signup/Signup.svelte";
  import { comment } from "svelte/internal";
</script>

<div class="router-container">
<Router>
  <nav class="nav-container">
    <Link to="/"> Home </Link>
    <Link to="/login"> Login </Link>
    <Link to="/signup"> Signup </Link>
    <Link to="/logout"> Logout </Link>
  </nav>
  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/signup" component={Signup} />
  <Route path="/logout" component={Logout} />
</Router>
</div>

<style>
  .nav-container {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: flex-start;
  }
</style>