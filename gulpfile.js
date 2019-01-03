var gulp = require('gulp');
var connect = require('gulp-connect')
var app             = {};
app.files           = 'app';
app.components   = 'app/components/**/*.js';
app.componentsTemplates = 'app/components/**/*.html';

gulp.task('default',['server']);

gulp.task('server', function() {
  	connect.server({
  	port: 9005,
  	host: 'localhost',
	fallback: 'index.html'
	});
});

const closureCompiler = require('google-closure-compiler').gulp();

gulp.task('js-compile', function () {
    return gulp.src([
        'js/i18next-1.10.1.min.js',
        'js/ng-i18next.js',
        'app/config.js',
        'js/shared.js',
        'js/loader.js',
        'js/map.js',
        'app/app.js',
        'app/shared/Services/ShipmentsService.js',
        'app/shared/Services/AuctionService.js',
        'app/shared/Services/UserService.js',
        'app/shared/Services/UserAbilityService.js',
        'app/shared/Services/AdminService.js',
        'app/shared/mainController.js',
        'app/components/Account/Login/loginController.js',
        'app/components/Account/Registration/registrationController.js',
        'app/components/Account/Profile/userProfileController.js',
        'app/components/Account/ForgotPassword/forgotPasswordController.js',
        'app/components/Auction/Create/createAuctionController.js',
        'app/components/Auction/List/auctionListController.js',
        'app/components/Auction/CreatedAuction/createdAuctionController.js',
        'app/components/Auction/FavouriteAuction/favouriteAuctionController.js',
        'app/components/Auction/WinAuction/winAuctionController.js',
        'app/components/Auction/BidsAuction/bidsAuctionController.js',
        'app/components/Shipments/new/newShipmentsController.js',
        'app/components/Shipments/finished/finishedShipmentsController.js',
        'app/components/Company/companyController.js',
        'app/components/Company/AddDriver/addDriverController.js',
        'app/components/Admin/Users/usersController.js',
        'app/components/Admin/Map/mapController.js',
        'app/shared/directives/DetailAuction/detailAuctionDirective.js',
        'app/shared/directives/DetailShipment/detailShipmentDirective.js',
        'app/shared/directives/DetailUser/detailUserDirective.js',
        'app/shared/directives/Menu/menuDirective.js',
        'app/shared/directives/egFiles.js',
        'app/shared/directives/pagingDirective.js',
        'app/routes.js'
    ], {base: './'})
        .pipe(closureCompiler({
            compilation_level: 'SIMPLE',
            warning_level: 'VERBOSE',
            jscomp_off: ['checkVars', 'suspiciousCode'],
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'output.min.js'
        }, {
            platform: ['native', 'java', 'javascript']
        }))
        .pipe(gulp.dest('./dist/js'));
});