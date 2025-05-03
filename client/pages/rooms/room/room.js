// Get hostel ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const hostelId = urlParams.get('hostelId');

// Modal elements
const modal = document.getElementById('addRoomModal');
const addRoomBtn = document.querySelector('.add-btn');
const closeModalBtn = document.querySelector('.modal-close');
const addRoomForm = document.getElementById('addRoomForm');

// Room data structure
let rooms = [];

// Modal handlers
addRoomBtn.addEventListener('click', () => {
    if (!hostelId) {
        alert('Please select a hostel first!');
        window.location.href = '../hostels/hostels.html';
        return;
    }
    document.querySelector('#addRoomForm').setAttribute('data-hostel-id', hostelId);
    document.querySelector('#addRoomModal h2').textContent = `Add New Room to Hostel ${hostelId}`;
    modal.classList.remove('hidden');
});
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    addRoomForm.reset();
});

// Only show hostel info if selected
if (hostelId) {
    document.title = `Add Rooms - Hostel ${hostelId}`;
    const headerText = document.createElement('h1');
    headerText.className = 'text-2xl font-bold mb-4';
    headerText.textContent = `Add Rooms to Hostel ${hostelId}`;
    document.querySelector('.head-container').insertBefore(headerText, document.querySelector('.search-bar'));
}

// Form submission handler
addRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    const errors = validateFormData(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    // Create new room object
    const newRoom = {
        id: rooms.length + 1,
        hostelId: hostelId,
        roomNumber: formData.get('roomNumber'),
        roomType: formData.get('roomType'),
        capacity: parseInt(formData.get('capacity')),
        rentPerBed: parseFloat(formData.get('rentPerBed')),
        floor: formData.get('floor'),
        status: formData.get('status'),
        occupants: 0,
        furniture: [],
        totalRent: function() {
            return this.capacity * this.rentPerBed;
        }
    };

    // Add room to collection
    rooms.push(newRoom);
    updateRoomDisplay();
    modal.classList.add('hidden');
    e.target.reset();
});

function validateFormData(formData) {
    const errors = [];
    
    if (!formData.get('roomNumber')) errors.push('Room number is required');
    if (!formData.get('roomType')) errors.push('Room type is required');
    if (!formData.get('capacity')) errors.push('Capacity is required');
    if (!formData.get('rentPerBed')) errors.push('Rent per bed is required');
    if (!formData.get('floor')) errors.push('Floor number is required');
    if (!formData.get('status')) errors.push('Room status is required');

    const capacity = parseInt(formData.get('capacity'));
    const rentPerBed = parseFloat(formData.get('rentPerBed'));

    if (isNaN(capacity) || capacity <= 0) errors.push('Capacity must be a positive number');
    if (isNaN(rentPerBed) || rentPerBed <= 0) errors.push('Rent per bed must be a positive number');

    return errors;
}

function updateRoomDisplay() {
    // Update room statistics
    document.querySelector('.top-section .card:nth-child(1) h2').textContent = rooms.length;
    document.querySelector('.top-section .card:nth-child(2) h2').textContent = 
        rooms.filter(room => room.status === 'occupied').length;
    document.querySelector('.top-section .card:nth-child(3) h2').textContent = 
        rooms.filter(room => room.status === 'available').length;

    // You can add more UI updates here as needed
}
