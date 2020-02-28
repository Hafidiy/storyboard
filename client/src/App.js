import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/home'
import { Dash } from './pages/dash'
import { Chat } from './pages/chat'
import { SBox } from './pages/stories'
import { Editor } from './pages/editor'
import { ReadStory } from './pages/read-story'

function App() {
  return (
      <BrowserRouter>
        <Route path='/' exact component={Home} />
        <Route path='/chat' component={Chat} />
        <Route path='/editor' component={Editor} />
        <Route path='/dashboard' component={Dash} />
        <Route path='/storiesbox' component={SBox} />
        <Route path='/readstory' component={ReadStory} />
      </BrowserRouter>
  );
}

export default App;
