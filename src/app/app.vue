<template>
  <center>
    <h1>ZcUI App!</h1>
    <div>
      <button @click.prevent="$store.dispatch('App/increment')">+</button>
      <strong class="count-value">{{$store.state.App.count}}</strong>
      <button @click.prevent="$store.dispatch('App/decrement')">-</button>
    </div>
  </center>
</template>

<script>
import './app.scss';

import App from './app';
export default App;
</script>

