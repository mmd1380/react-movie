import DefaultLayout from './layout/default';
import Router from './router/index';
import "./assets/styles/app.css"

function App() {
  return (
    <DefaultLayout>
      <Router />
    </DefaultLayout>
  );
}

export default App;
