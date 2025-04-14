// Example script to dynamically display hostel details
document.addEventListener('DOMContentLoaded', () => {
    const hostelInfo = {
        totalHostels: 5,
        availableRooms: 20,
        occupiedRooms: 10,
        hostels: [
            { name: 'Hostel A', rooms: 15, status: 'Available' },
            { name: 'Hostel B', rooms: 10, status: 'Occupied' },
            { name: 'Hostel C', rooms: 12, status: 'Available' },
            { name: 'Hostel D', rooms: 18, status: 'Available' },
            { name: 'Hostel E', rooms: 22, status: 'Occupied' }
        ]
    };

    // Update hostel info on the page
    document.querySelector('.hostel-info').innerHTML = `
        <p>Total Hostels: ${hostelInfo.totalHostels}</p>
        <p>Available Rooms: ${hostelInfo.availableRooms}</p>
        <p>Occupied Rooms: ${hostelInfo.occupiedRooms}</p>
    `;

    // Populate hostel cards dynamically
    const hostelList = document.querySelector('.hostel-list');
    hostelInfo.hostels.forEach(hostel => {
        const hostelCard = document.createElement('div');
        hostelCard.classList.add('hostel-card');
        hostelCard.innerHTML = `
            <h3>${hostel.name}</h3>
            <p>Rooms: ${hostel.rooms}</p>
            <p>Status: ${hostel.status}</p>
        `;
        hostelList.appendChild(hostelCard);
    });
});
