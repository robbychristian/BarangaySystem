/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import "flowbite";

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./components/Example");
require("./page/auth/RegisterPage");
require("./page/auth/LoginPage");
require("./page/Home/HomePage");

require("./page/Services/ServicesPage");
require("./page/Services/DocumentSubmissionPage");
require("./page/Services/BlotterReportPage");
require("./page/Services/ReservationPage");
require("./page/Services/TransactionsPage");
require("./page/Services/ClinicPage");

require("./page/Announcements/AnnouncementPage");
require("./page/Announcements/BarangayNews/BarangayNewsPage");
require("./page/Announcements/CreateAnnouncementPage");
require("./page/Announcements/UpcomingEventsPage");
require("./page/Announcements/PastEventsPage");

require("./page/Reports/ReportsPage");
require("./page/Reports/BarangayReports");
require("./page/Reports/ResidentRecords");
require("./page/Reports/IncidentReports");
require("./page/Reports/TransactionReports");

require("./page/UserManagement/UserManagementPage");
require("./page/UserManagement/AddUserPage");

require("./page/TanodDeployment/TanodDeploymentList");
require("./page/TanodDeployment/TanodDeploymentPage");

require('./page/AuditTrail/AuditTrailPage')

require('./page/UserManagement/EditProfile');