const hostelContainer = document.getElementById("hostelContainer");

// Simulated backend-style data
const hostelData = [
  {
    name: "H1",
    floors: {
      "01": {
        occupied: [101, 105, 106, 107, 113, 116, 118, 125, 127, 128],
        partial: [136, 137]
      },
      "02": {
        occupied: [101, 105, 106, 107, 113, 116, 118, 125, 127, 128],
        partial: [136, 137]
      },
      "03": {
        occupied: [104, 109, 110, 117, 122, 130],
        partial: [133]
      }
    }
  },
  {
    name: "H2",
    floors: {
      "07": {
        occupied: [102, 103, 107, 111, 114, 123],
        partial: [135, 137]
      },
      "09": {
        occupied: [105, 106, 110, 112, 129],
        partial: [131, 132]
      }
    }
  },
  {
    name: "H3",
    floors: {
      "07": {
        occupied: [103, 106, 108, 115, 118, 121, 127, 128],
        partial: [137]
      }
    }
  },
  {
    name: "H4",
    floors: {
      "07": {
        occupied: [102, 105, 107, 113, 119, 125, 130],
        partial: [133, 134]
      },
      "10": {
        occupied: [101, 102, 103, 104],
        partial: [105]
      }
    }
  }
];

// Render logic
hostelData.forEach(hostel => {
  Object.entries(hostel.floors).forEach(([floorNo, status]) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Header
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
    <span>🏢 ${hostel.name}</span>
    <span>Floor No. ${floorNo}</span>
    <span>🛏️ 4 Bedded Bunker</span>
    `;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    // Generate rooms in 4 rows of 10
    for (let row = 0; row < 4; row++) {
      for (let col = 1; col <= 10; col++) {
        const roomNumber = (row * 10) + col + 100;
        const room = document.createElement("div");
        room.classList.add("room");

        if (status.occupied.includes(roomNumber)) {
          room.classList.add("occupied");
        } else if (status.partial.includes(roomNumber)) {
          room.classList.add("partial");
        }

        room.innerText = roomNumber;
        grid.appendChild(room);
      }
    }

    card.appendChild(header);
    card.appendChild(grid);
    hostelContainer.appendChild(card);
  });
});