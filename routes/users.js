const express = require ('express'); 
const router = express.Router(); 

export default function bar() {
  //
}
//Login Page 
router.get('/login', (req, res) => res.send('Login')); 

//Register Page
router.get('/register', (req, res) => res.send('Register')); 

//No Page
router.get('/', (req, res) => res.send('Welcome to Browsers')); 

module.exports = router; 