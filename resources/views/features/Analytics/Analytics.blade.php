@extends('layouts.app')

@section('sidebar_content')
    <div class="grid grid-cols-2 gap-8">
        <div>
            <canvas id="usersChart"></canvas>
        </div>
        <div>
            <canvas id="eServiceChart"></canvas>
        </div>
    </div>

    <!-- ChartJS -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <script>
        const ctx1 = document.getElementById('usersChart');
        let roles = ['Barangay Official', 'Barangay Staff', 'Resident'];
        let totalUsersPerRole = {!! json_encode($totalUsersPerRole) !!}
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: roles,
                datasets: [{
                    data: totalUsersPerRole,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Total Number of Users'
                    }
                }
            }
        });
    </script>

    <script>
        const ctx2 = document.getElementById('eServiceChart');
        let type = {!! json_encode($type) !!};
        let totalPerType = {!! json_encode($totalPerType) !!}
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: type,
                datasets: [{
                    data: totalPerType,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Total Number of E-Services per Type'
                    }
                }
            }
        });
    </script>
@endsection
