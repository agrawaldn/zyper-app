## Build instructions for tomcat
#Prerequisites: 1) git client is installed on build machine 2) maven is installed on build machine
Run `git clone https://github.com/agrawaldn/zyper-app.git` to download project
Run `cd zyper-app` 
Run `mvn clean package` This will generate deployable zyper-app.war inside target directory, that can be deployed onto tomcat server
Befor deploying, make sure that you edit and update index.html inside war file to change `<base href="/">`  to `<base href=".">` ng build that is run my mvn command generates incorrect href. Application will not load if you use "/"
copy `zyper-app.war` to webapps directory of tomcat. Usually under `/opt/tomcat/webapps`

Please note that production build needs to be manually generated using `--configuration=production` flag while running ng build command. See instructions below.
If you need to update ApiUrl for production then edit it first under `src/environments/environment.prod.ts` and `src/environments/environment.ts` for development environment.

# ZyperApp

This project contains frontend code (client) for zyper application. Currently it has only order module containing 2 components order-list and order-verify

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `ng build --configuration=production` command for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
