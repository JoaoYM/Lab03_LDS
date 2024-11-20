// // src/components/Header.js
// import React from "react";

// const Header = ({ userType }) => {
//   return (
//     <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <nav className="space-x-4">
//         <a href="/" className="hover:underline">Home</a>
//         {userType !== "Professor" && (
//           <a href="/vantagens" className="hover:underline">Minhas Vantagens</a>
//         )}
//         <a href="/historico-conta" className="hover:underline">Minhas Transações</a>
//       </nav>
//       <div className="relative">
//         <button className="bg-blue-800 px-4 py-2 rounded-full">User Icon ▼</button>
//         <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
//           <a href="/perfil" className="block px-4 py-2 hover:bg-gray-200">Meu Perfil</a>
//           <a href="/sair" className="block px-4 py-2 hover:bg-gray-200">Sair</a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;