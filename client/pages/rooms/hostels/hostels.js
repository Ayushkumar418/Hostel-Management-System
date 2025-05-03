// Sample data structure
let hostels = [
    {
        id: 1,
        name: "Hostel 1",
        floors: 3,
        kitchens: 2,
        washrooms: 12,
        address: {
            line1: "Plot number 206",
            line2: "Tihri Nagar, Main Hawai Sadak",
            district: "Jaipur",
            state: "Rajasthan",
            country: "India",
            pincode: "302021"
        },
        totalRooms: 458,
        occupiedRooms: 58,
        students: {
            total: 6582,
            inHostel: 1569,
            outsideHostel: 2500
        },
        furniture: {
            "Ceiling Fan": 50,
            "Center Table": 12,
            "Chairs": 123,
            "Refrigerator": 6
        },
        finances: {
            expected: 1565852,
            collected: 391463,
            remaining: 751608,
            overdue: 485414.12
        }
    }
];

// Default hostel data
const defaultHostel = {
    id: 1,
    name: "Boys Hostel A",
    floors: 3,
    kitchens: 2,
    washrooms: 12,
    address: {
        line1: "Plot number 206",
        line2: "Tihri Nagar, Main Hawai Sadak",
        district: "Jaipur",
        state: "Rajasthan",
        country: "India",
        pincode: "302021"
    },
    totalRooms: 458,
    occupiedRooms: 58,
    students: {
        total: 6582,
        inHostel: 1569,
        outsideHostel: 2500
    },
    furniture: {
        "Ceiling Fan": 50,
        "Center Table": 12,
        "Chairs": 123,
        "Refrigerator": 6
    },
    finances: {
        expected: 1565852,
        collected: 391463,
        remaining: 751608,
        overdue: 485414.12
    }
};

// UI update functions
function updateHostelDisplay(hostel) {
    document.querySelector('.total-hostel').textContent = `Total Hostel: ${hostels.length}`;
    document.querySelector('h2.text-2xl').textContent = `${hostel.name} 📝`;
    
    // Format address display
    const formattedAddress = `${hostel.address.line1},<br>${hostel.address.line2},<br>${hostel.address.district} - ${hostel.address.state} - ${hostel.address.pincode} ${hostel.address.country}`;
    document.querySelector('p.text-gray-400.mt-2').innerHTML = formattedAddress;
    
    // Update stats
    const statsElements = document.querySelectorAll('.text-lg.font-semibold');
    statsElements[0].textContent = hostel.totalRooms;
    statsElements[1].textContent = hostel.floors;
    statsElements[2].textContent = hostel.washrooms;
    
    // Update occupancy chart
    updateOccupancyChart(hostel.occupiedRooms, hostel.totalRooms);
    
    // Update collection chart
    updateCollectionChart(hostel.finances);
}

// Chart updates
function updateOccupancyChart(occupied, total) {
    const percentage = Math.round((occupied / total) * 100);
    const ctx = document.getElementById('occupancyChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: ['#00FFFF', '#1a1a1a'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '80%',
            plugins: { legend: { display: false } }
        }
    });
    
    document.querySelector('#occupancyChart + div').textContent = `${percentage}%`;
}

function updateCollectionChart(finances) {
    const ctx = document.getElementById('collectionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Collected', 'Remaining', 'Overdue', 'Expected'],
            datasets: [{
                data: [finances.collected, finances.remaining, finances.overdue, finances.expected],
                backgroundColor: ['#00FFFF', '#FFD700', '#FF00FF', '#1a1a1a'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '70%',
            plugins: { legend: { display: false } }
        }
    });
}

// Modal handling
const modal = document.getElementById('addHostelModal');
const addHostelButton = document.querySelector('.add-hostel');
const closeModalButton = document.querySelector('.modal-close');

addHostelButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));

// Form handling
function validateFormData(formData) {
    const errors = [];
    
    // Required fields validation
    if (!formData.get('hostelName').trim()) errors.push("Hostel name is required");
    if (!formData.get('addressLine1').trim()) errors.push("Address Line 1 is required");
    if (!formData.get('pincode').trim()) errors.push("Pincode is required");
    
    // Numeric validations
    const numericFields = {
        'floors': 'Number of Floors',
        'kitchens': 'Number of Kitchens',
        'washrooms': 'Number of Washrooms',
        'totalRooms': 'Total Rooms',
        'totalBeds': 'Number of Beds',
        'totalStudents': 'Total Students',
        'inHostel': 'Students in Hostel',
        'outsideHostel': 'Outside Students',
        'expectedFees': 'Expected Fees',
        'collectedFees': 'Collected Fees'
    };

    for (const [field, label] of Object.entries(numericFields)) {
        const value = formData.get(field);
        if (value && (isNaN(value) || parseInt(value) < 0)) {
            errors.push(`${label} must be a valid positive number`);
        }
    }

    // Business logic validations
    const students = {
        total: parseInt(formData.get('totalStudents')) || 0,
        inHostel: parseInt(formData.get('inHostel')) || 0,
        outside: parseInt(formData.get('outsideHostel')) || 0
    };

    const fees = {
        expected: parseFloat(formData.get('expectedFees')) || 0,
        collected: parseFloat(formData.get('collectedFees')) || 0
    };

    if (students.inHostel + students.outside > students.total) {
        errors.push("Total students must be greater than or equal to sum of in-hostel and outside students");
    }

    if (fees.collected > fees.expected) {
        errors.push("Collected fees cannot exceed expected fees");
    }

    return errors;
}

document.getElementById('addHostelForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    const errors = validateFormData(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const newHostel = {
        id: hostels.length + 1,
        name: formData.get('hostelName'),
        floors: parseInt(formData.get('floors')) || 0,
        kitchens: parseInt(formData.get('kitchens')) || 0,
        washrooms: parseInt(formData.get('washrooms')) || 0,
        totalRooms: parseInt(formData.get('totalRooms')) || 0,
        totalBeds: parseInt(formData.get('totalBeds')) || 0,
        occupiedRooms: 0,
        students: {
            total: parseInt(formData.get('totalStudents')) || 0,
            inHostel: parseInt(formData.get('inHostel')) || 0,
            outsideHostel: parseInt(formData.get('outsideHostel')) || 0
        },
        address: {
            line1: formData.get('addressLine1'),
            line2: formData.get('addressLine2'),
            district: formData.get('district'),
            state: formData.get('state'),
            country: formData.get('country'),
            pincode: formData.get('pincode')
        },
        finances: {
            expected: parseFloat(formData.get('expectedFees')) || 0,
            collected: parseFloat(formData.get('collectedFees')) || 0,
            remaining: function() {
                return this.expected - this.collected;
            },
            overdue: 0
        }
    };

    hostels.push(newHostel);
    createHostelStructure(newHostel);
    updateTotalHostels();
    updateCharts(newHostel);
    modal.classList.add('hidden');
    e.target.reset();
});

// Initialize with default hostel
document.addEventListener('DOMContentLoaded', () => {
    hostels = [defaultHostel];
    createHostelStructure(defaultHostel);
    updateTotalHostels();
});

// Create dynamic hostel structure
function createHostelStructure(hostel) {
    const hostelSection = document.createElement('div');
    hostelSection.className = 'grid grid-cols-4 gap-4 mb-8';
    hostelSection.setAttribute('data-hostel-id', hostel.id);

    hostelSection.innerHTML = `
        <!-- Left Panel -->
        <div class="col-span-1 flex flex-col justify-between bg-[#1a1a1a] rounded-2xl p-4">
            <div>
                <h2 class="text-2xl font-semibold">${hostel.name} 📝</h2>
                <p class="text-gray-400 mt-2 text-sm">${hostel.address.line1},<br>${hostel.address.line2},<br>${hostel.address.district} - ${hostel.address.state} - ${hostel.address.pincode}</p>
                <div class="w-40 h-40 mt-6 mx-auto relative">
                    <canvas id="occupancyChart_${hostel.id}"></canvas>
                    <div class="absolute inset-0 flex items-center justify-center text-3xl font-bold">0%</div>
                </div>
            </div>
            <button class="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold w-full add-room-btn" data-hostel-id="${hostel.id}">+Add Room</button>
        </div>

        <!-- Stats Section -->
        <div class="col-span-2 grid grid-cols-3 gap-4">
            <div class="col-span-3 flex gap-4">
                <div class="bg-[#1a1a1a] flex items-center gap-2 px-4 py-3 rounded-xl w-full">
                    <span class="text-pink-500 text-xl">🛏️</span>
                    <span class="text-lg font-semibold">${hostel.totalRooms || 0}</span>
                </div>
                <div class="bg-[#1a1a1a] flex items-center gap-2 px-4 py-3 rounded-xl w-full">
                    <span class="text-green-400 text-xl">🛗</span>
                    <span class="text-lg font-semibold">${hostel.floors || 0}</span>
                </div>
                <div class="bg-[#1a1a1a] flex items-center gap-2 px-4 py-3 rounded-xl w-full">
                    <span class="text-red-500 text-xl">🚽</span>
                    <span class="text-lg font-semibold">${hostel.washrooms || 0}</span>
                </div>
            </div>

            <!-- Room Stats -->
            <div class="bg-[#1a1a1a] p-4 rounded-xl text-center">
                <p class="text-gray-400">Total Rooms</p>
                <p class="text-xl font-bold">${hostel.totalRooms || 0}</p>
            </div>
            <div class="bg-[#1a1a1a] p-4 rounded-xl text-center">
                <p class="text-gray-400">Kitchen/Cafeteria</p>
                <p class="text-xl font-bold text-yellow-400">${hostel.kitchens || 0}</p>
            </div>
            <div class="bg-[#1a1a1a] p-4 rounded-xl text-center">
                <p class="text-gray-400">Floors</p>
                <p class="text-xl font-bold">${hostel.floors || 0}</p>
            </div>

            <!-- Students -->
            <div class="col-span-3 flex justify-between bg-[#1a1a1a] p-4 rounded-xl">
                <div>
                    <p class="text-gray-400">Students</p>
                    <p class="font-bold text-white text-lg">${hostel.students?.total || 0}</p>
                </div>
                <div>
                    <p class="text-gray-400">In Hostel</p>
                    <p class="font-bold text-cyan-400 text-lg">${hostel.students?.inHostel || 0}</p>
                </div>
                <div>
                    <p class="text-gray-400">Outside Hostel</p>
                    <p class="font-bold text-white text-lg">${hostel.students?.outsideHostel || 0}</p>
                </div>
            </div>

            <!-- Amount Stats -->
            <div class="col-span-3 grid grid-cols-4 gap-4 mt-2">
                <div class="col-span-1 bg-[#1a1a1a] p-4 rounded-xl">
                    <p class="text-gray-400">Expected</p>
                    <p class="text-xl font-bold">₹ ${formatAmount(hostel.finances?.expected || 0)}</p>
                </div>
                <div class="col-span-1 bg-[#1a1a1a] p-4 rounded-xl">
                    <p class="text-gray-400">Collected</p>
                    <p class="text-xl font-bold text-cyan-400">₹ ${formatAmount(hostel.finances?.collected || 0)}</p>
                </div>
                <div class="col-span-1 bg-[#1a1a1a] p-4 rounded-xl">
                    <p class="text-gray-400">Remaining</p>
                    <p class="text-xl font-bold text-yellow-400">₹ ${formatAmount(hostel.finances?.remaining || 0)}</p>
                </div>
                <div class="col-span-1 bg-[#1a1a1a] p-4 rounded-xl">
                    <p class="text-gray-400">Overdue</p>
                    <p class="text-xl font-bold text-pink-500">₹ ${formatAmount(hostel.finances?.overdue || 0)}</p>
                </div>
            </div>
        </div>

        <!-- Right Section -->
        <div class="col-span-1 flex flex-col gap-4">
            <div class="bg-[#1a1a1a] rounded-2xl p-4">
                <h3 class="text-lg font-semibold mb-2">Collection</h3>
                <div class="relative w-44 h-44 mx-auto">
                    <canvas id="collectionChart_${hostel.id}"></canvas>
                    <div class="absolute inset-0 flex items-center justify-center text-2xl font-bold">0%</div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.main-container').appendChild(hostelSection);
    initializeCharts(hostel);

    // Add click handler for the add room button
    hostelSection.querySelector('.add-room-btn').addEventListener('click', (e) => {
        const hostelId = e.target.getAttribute('data-hostel-id');
        window.location.href = `../room/room.html?hostelId=${hostelId}`;
    });
}

function formatAmount(amount) {
    return new Intl.NumberFormat('en-IN').format(amount);
}

function updateTotalHostels() {
    document.querySelector('.total-hostel').textContent = `Total Hostel: ${hostels.length}`;
}

// Initialize charts for new hostel
function updateCharts(hostel) {
    const charts = Chart.getChart(`occupancyChart_${hostel.id}`);
    if (charts) charts.destroy();
    
    const collectionCharts = Chart.getChart(`collectionChart_${hostel.id}`);
    if (collectionCharts) collectionCharts.destroy();
    
    initializeCharts(hostel);
}

function initializeCharts(hostel) {
    // Occupancy Chart
    const occupancyPercentage = Math.round((hostel.occupiedRooms / hostel.totalRooms) * 100) || 0;
    const occupancyCtx = document.getElementById(`occupancyChart_${hostel.id}`).getContext('2d');
    
    new Chart(occupancyCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [occupancyPercentage, 100 - occupancyPercentage],
                backgroundColor: ['#00FFFF', '#1a1a1a'],
                borderWidth: 0,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });

    // Collection Chart
    const totalAmount = hostel.finances.expected;
    const collectionData = [
        (hostel.finances.collected / totalAmount) * 100,
        (hostel.finances.remaining / totalAmount) * 100,
        (hostel.finances.overdue / totalAmount) * 100
    ];

    const collectionCtx = document.getElementById(`collectionChart_${hostel.id}`).getContext('2d');
    new Chart(collectionCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: collectionData,
                backgroundColor: ['#00FFFF', '#FFD700', '#FF69B4'],
                borderWidth: 0,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });

    // Update percentage displays
    const collectedPercentage = Math.round((hostel.finances.collected / hostel.finances.expected) * 100) || 0;
    document.querySelector(`#occupancyChart_${hostel.id} + div`).textContent = `${occupancyPercentage}%`;
    document.querySelector(`#collectionChart_${hostel.id} + div`).textContent = `${collectedPercentage}%`;
}