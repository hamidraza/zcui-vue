<template>
  <center>
    <h1>zcui App</h1>
    <div>
      <button @click.prevent="$store.state.increment">+</button>
      <strong>{{$store.state.count}}</strong>
      <button @click.prevent="$store.state.decrement">-</button>
    </div>
  </center>
</template>

<script>
import './app.scss';

import App from './app';
export default App;
</script>

