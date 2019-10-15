import React, { Component } from "react";
import AppNavbar from "./component/AppNavbar";
import ShoppingList from "./component/ShoppingList";
import ItemModal from "./component/ItemModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

// // import React, { Component } from "react";
// // import AppNavbar from "./component/AppNavbar";
// // import ShoppingList from "./component/shoppingList";
// // import { loadUser } from "./actions/authActions";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { Provider } from "react-redux";
// // import store from "./store";
// import React, { Component } from "react";
// import AppNavbar from "./components/AppNavbar";
// import ShoppingList from "./components/ShoppingList";
// import ItemModal from "./components/ItemModal";
// import { Container } from "reactstrap";

// import { Provider } from "react-redux";
// import store from "./store";
// import { loadUser } from "./actions/authActions";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// class App extends Component {
//   componentDidMount() {
//     store.dispatch(loadUser());
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <div className="App">
//           <AppNavbar />
//           <Container>
//             <ItemModal />
//             <ShoppingList />
//           </Container>
//         </div>
//       </Provider>
//     );
//   }
// }

// // import ItemModel from "./component/itemModel";
// // import { Container } from "reactstrap";
// // import "./App.css";

// // class App extends Component {
// //   componentDidMount() {
// //     store.dispatch(loadUser());
// //     console.log("one");
// //   }

// //   render() {
// //     return (
// //       <Provider store={store}>
// //         <div className="App">
// //           <AppNavbar />
// //           <Container>
// //             <ItemModel />
// //             <ShoppingList />
// //           </Container>
// //         </div>
// //       </Provider>
// //     );
// //   }
// // }
// // export default App;
