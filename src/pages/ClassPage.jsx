import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ClassPage = () => {
  const location = useLocation();
  const { className } = location.state || {};
  const navigate = useNavigate();

  const data = {
    "Class 1": [
      {
        title: "Maths",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR3lKVV_tvZxztT4MgDTK-M0yyAmgxhNIIC-3q5Cu12OOpvXCsOFbCik9WRa-8QKfjGmmvEOlxPu58M1_4-hVo_Pr38Fy0uNQ",
        navigate: "/FlipPage"
      },
      {
        title: "Computer",
        img: "https://m.media-amazon.com/images/I/51DwaOWP1uL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        title: "Hindi",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSIpwpTT_xsU0KWws1GO6o4_O4ZkjHeA4LXARqmFJVuOlvzjM_BN7s8ZajBYBAns5qg3Ic6brTLQOVrdw5HJqcC44GerGQgQ"
      },
      {
        title: "English",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRR80zkZ_ibieg6_AZmMfX6oVT3tsA4nip16qVK9fpZxL5BMNf-1L_kxAV2BSjWG2-336JAqFvkzPFsFXWBKxtO8vArhQXDUnbRkgAjGavMmoF0IAZjjvXLE7U"
      }
    ],

    "Class 2": [
      {
        title: "Maths",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTO35QA3KVW0adtL-wiV87UzRxEQEYndrwuHj9Lzyo1RdP5GgS2Y5h9AUcL3dfVGq94cGteCr-NON8GBne2e2QmPeHoqkmnYdbFU7SLhWE"
        
      },
      {
        title: "EVS",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTOZXSuLEqJGOoe34siZ82xgXHflMJA4k919t5ORWqRabkRyrd-qIF4_t6jdty9B84ZQDD4s2S3sTzQ_c_IGlwNnbvhTyQy2w"
      },
      {
        title: "Hindi",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpz4pbSq8XzxQnt4EcPEb9qavg1SEPRL6r7EWn4CELenJGC884ocaLQd8R0GSVjJpz_9m7Sn6gtuwJlA1r17rPHugVmRyzgpyeRKuaui0e"
      },
      {
        title: "English",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRsxhKHo8C8UexKZhlp585wUYMCrzbaNN_LbRYCMi1eviPTWa2kT7k3o8LsjbWAjklk7DzXxZO26Cg6zDyUGOnUp2MbOcHCfw"
      }
    ],
     "Class 3": [
      {
        title: "Maths",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR3lKVV_tvZxztT4MgDTK-M0yyAmgxhNIIC-3q5Cu12OOpvXCsOFbCik9WRa-8QKfjGmmvEOlxPu58M1_4-hVo_Pr38Fy0uNQ",
        navigate: "/FlipPage"
      },
      {
        title: "Computer",
        img: "https://m.media-amazon.com/images/I/51DwaOWP1uL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        title: "Hindi",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSIpwpTT_xsU0KWws1GO6o4_O4ZkjHeA4LXARqmFJVuOlvzjM_BN7s8ZajBYBAns5qg3Ic6brTLQOVrdw5HJqcC44GerGQgQ"
      },
      {
        title: "English",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRR80zkZ_ibieg6_AZmMfX6oVT3tsA4nip16qVK9fpZxL5BMNf-1L_kxAV2BSjWG2-336JAqFvkzPFsFXWBKxtO8vArhQXDUnbRkgAjGavMmoF0IAZjjvXLE7U"
      }
    ],
     "Class 4": [
      {
        title: "Maths",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR3lKVV_tvZxztT4MgDTK-M0yyAmgxhNIIC-3q5Cu12OOpvXCsOFbCik9WRa-8QKfjGmmvEOlxPu58M1_4-hVo_Pr38Fy0uNQ",
        navigate: "/FlipPage"
      },
      {
        title: "Computer",
        img: "https://m.media-amazon.com/images/I/51DwaOWP1uL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        title: "Hindi",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSIpwpTT_xsU0KWws1GO6o4_O4ZkjHeA4LXARqmFJVuOlvzjM_BN7s8ZajBYBAns5qg3Ic6brTLQOVrdw5HJqcC44GerGQgQ"
      },
      {
        title: "English",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRR80zkZ_ibieg6_AZmMfX6oVT3tsA4nip16qVK9fpZxL5BMNf-1L_kxAV2BSjWG2-336JAqFvkzPFsFXWBKxtO8vArhQXDUnbRkgAjGavMmoF0IAZjjvXLE7U"
      }
    ],
     "Class 5": [
      {
        title: "Maths",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR3lKVV_tvZxztT4MgDTK-M0yyAmgxhNIIC-3q5Cu12OOpvXCsOFbCik9WRa-8QKfjGmmvEOlxPu58M1_4-hVo_Pr38Fy0uNQ",
        navigate: "/FlipPage"
      },
      {
        title: "Computer",
        img: "https://m.media-amazon.com/images/I/51DwaOWP1uL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        title: "Hindi",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSIpwpTT_xsU0KWws1GO6o4_O4ZkjHeA4LXARqmFJVuOlvzjM_BN7s8ZajBYBAns5qg3Ic6brTLQOVrdw5HJqcC44GerGQgQ"
      },
      {
        title: "English",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRR80zkZ_ibieg6_AZmMfX6oVT3tsA4nip16qVK9fpZxL5BMNf-1L_kxAV2BSjWG2-336JAqFvkzPFsFXWBKxtO8vArhQXDUnbRkgAjGavMmoF0IAZjjvXLE7U"
      }
    ]
  };

  const books = data[className] || [];

  return (
    <div className="min-h-screen p-30  bg-gray-100">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-20 bg-blue-500 text-black w-max mx-auto">
        {className}
      </h1>

      <div className="flex flex-wrap gap-20 justify-center mb-15 mt-20">

        {books.map((item, i) => (
          <div key={i} onClick={() => item.navigate && navigate(item.navigate)} className="flex flex-col items-center cursor-pointer">
            <img
              src={item.img}
              alt={item.title}
              className="w-40 h-52 object-cover"
            />
            <p className="text-xl font-bold mt-2">
              {item.title}
            </p>
          </div>
        ))}

      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-black px-4 py-2 rounded text-2xl font-bold "
        >
        Back
        </button>
      </div>

    </div>
  );
};

export default ClassPage;