# sfops-gh-actions

Reusable Github actions and workflows that make it easier to apply sfpowercripts / dx@scale to GitHub.
Please note this repo is licensed using BSL [License](./LICENSE) and should only be used after
explicit permission is requested

This folder houses reusable github actions used by projects

Reusable GitHub Actions

1. packageversionreporter

This action reports the packages installed in an org, and updates the equivalent html reports.

2. gitrepocommitter

This action can be used to commit a directory to another target directory in the rpo

3. apextestresultreporter

This action triggers all local tests of an org and report the reports to a provided target directory in another repository

4. chanelogreporter

This action takes in a changelog.json generated by sfpowerscripts and convert that into an HTML Page

5. createSandboxForDev

This action creates a developer sandbox, deactivates all users, then creates a fake user and assign System Admin profile

6. deleteSandbox

This action deletes a sandbox

7. unlockedPackageInstaller

This action can be used to install 2GP package into org
