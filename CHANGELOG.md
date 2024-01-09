# Changelog

## [24.5.3](https://github.com/flxbl-io/sfops/compare/v24.5.2...v24.5.3) (2024-01-09)


### Bug Fixes

* **impact:** update sfp to 30.2.6 ([7b6b7d5](https://github.com/flxbl-io/sfops/commit/7b6b7d51b6c81b624fd6e2597523627d15cde5e9))

## [24.5.2](https://github.com/flxbl-io/sfops/compare/v24.5.1...v24.5.2) (2024-01-09)


### Bug Fixes

* **impact:** rollback to 30.2.4 ([c0651a2](https://github.com/flxbl-io/sfops/commit/c0651a2909701d43ea0857488a39e5bcd6c69fa3))

## [24.5.1](https://github.com/flxbl-io/sfops/compare/v24.5.0...v24.5.1) (2024-01-09)


### Bug Fixes

* **pr-validate:** update sfp to 30.2.5 ([cc55a75](https://github.com/flxbl-io/sfops/commit/cc55a753bd8297cadf503903adca438aeceb42a9))

## [24.5.0](https://github.com/flxbl-io/sfops/compare/v24.4.2...v24.5.0) (2024-01-09)


### Features

* **actions:** optimize impacted release config check ([fa577fe](https://github.com/flxbl-io/sfops/commit/fa577feb8091a879d35d3530aa772f08fb183e7c))


### Bug Fixes

* **pr-validate:** ensure sha is used instead of ref in github context ([3efba54](https://github.com/flxbl-io/sfops/commit/3efba54592ee097851294d1380b2c9579889bf95))
* **pr-validate:** remove the incorrect path mentioned in comment ([aac66d6](https://github.com/flxbl-io/sfops/commit/aac66d6833e98b84b20dd07f7b0a8e7122bf105c))
* **pr-validate:** use the correct parameters and switch to the correct action ([68083e5](https://github.com/flxbl-io/sfops/commit/68083e55b8be7a060326697498cac2cf57afad7f))
* **releaseconfig-impact:** update to bugfixed upstream of sfp ([352b5e9](https://github.com/flxbl-io/sfops/commit/352b5e93d337509961ddcade2a2a0cf9af7ab55a))
* **renew:** ensure renew is operated even when sandbox is not assigned ([b425713](https://github.com/flxbl-io/sfops/commit/b4257134fc8c7c8d59fced5aad4e8b1358ce2b1b))

## [24.4.2](https://github.com/flxbl-io/sfops/compare/v24.4.1...v24.4.2) (2024-01-09)


### Bug Fixes

* **workflows:** add force for sfp override ([ac16634](https://github.com/flxbl-io/sfops/commit/ac166343eb675c78641d0a81fe870e5e1ff501c6))

## [24.4.1](https://github.com/flxbl-io/sfops/compare/v24.4.0...v24.4.1) (2024-01-08)


### Bug Fixes

* **cicd:** rename the job to be explict ([d16fd7a](https://github.com/flxbl-io/sfops/commit/d16fd7a0d97ecd173e743c76b9f940151e009398))
* **workflows:** temporarily override sfp to flxbl version ([8a8c336](https://github.com/flxbl-io/sfops/commit/8a8c3366a4053807996fa66e49a35e96237c5ddd))

## [24.4.0](https://github.com/flxbl-io/sfops/compare/v24.3.1...v24.4.0) (2024-01-08)


### Features

* **docker:** ability to select customer images or older images while syncing workflows ([b9c334c](https://github.com/flxbl-io/sfops/commit/b9c334cb0d0838734c0cfd1a01e67ce3b46d1dc0))


### Bug Fixes

* **cicd:** add env variables for replacing image ([a1eac26](https://github.com/flxbl-io/sfops/commit/a1eac26ce26999ae13f1496a5484777363466fa5))
* **cicd:** ensure different place holders are used ([28eca00](https://github.com/flxbl-io/sfops/commit/28eca006653f870fbcc11414a898a8fceefa0e93))

## [24.3.1](https://github.com/flxbl-io/sfops/compare/v24.3.0...v24.3.1) (2024-01-08)


### Bug Fixes

* **actions:** fix incorrect json parsing ([c355097](https://github.com/flxbl-io/sfops/commit/c35509726e6a1987a0d990f3d94511f6fe68a305))
* **actions:** fix incorrect use of paginate in expiring sandboxes ([f1f7d92](https://github.com/flxbl-io/sfops/commit/f1f7d922e93eb68523d92cec0783bf8ed0e96086))
* **actions:** remove duplication of gh merge-json ([b2f4621](https://github.com/flxbl-io/sfops/commit/b2f462136c8b2e068e3222245e6822e023ef71cc))
* **actions:** remove incorrect spacing on log ([7af61d1](https://github.com/flxbl-io/sfops/commit/7af61d165fe280d4b00421d827e2ff4f67d889aa))
* **workflows:** add pagination to list sandbox creation issues ([cea2cf5](https://github.com/flxbl-io/sfops/commit/cea2cf58efddc01511a319cdbc67fd77b29b8f61))

## [24.3.0](https://github.com/flxbl-io/sfops/compare/v24.2.2...v24.3.0) (2024-01-06)


### Features

* **actions:** remove the need for manual reopen/close for PR during renew ([5ed50a8](https://github.com/flxbl-io/sfops/commit/5ed50a8f0bc8a37fd198cc0ba2ff0b9a1862ac6b))
* **cicd:** add version number to sync info ([630145a](https://github.com/flxbl-io/sfops/commit/630145aa570c5ee6c646dcd517e77da0b7570681))
* **workflows:** display a comment when no config(domain) is identified when a PR is analyzed ([22a720a](https://github.com/flxbl-io/sfops/commit/22a720a39a954b06eedd0bd9900390de9e213b15))
* **workflows:** print name of release config used in comments ([d36d516](https://github.com/flxbl-io/sfops/commit/d36d516c78240720541184fa3e905e69d350303e))


### Bug Fixes

* **actions:** ensure exec actions within allocate jobs are timed out within 5 mins ([b7136f0](https://github.com/flxbl-io/sfops/commit/b7136f0cfb545ec6b00de23caef8fc0d4a4359d0))

## [24.2.2](https://github.com/flxbl-io/sfops/compare/v24.2.1...v24.2.2) (2024-01-05)


### Bug Fixes

* **actions:** fix tag for review sandboxes ([f8b4b1a](https://github.com/flxbl-io/sfops/commit/f8b4b1a56f1c17e65197bb565cb533a55870012b))
* **workflows:** do not trigger any branch deploy related tasks in Draft mode ([984d1ba](https://github.com/flxbl-io/sfops/commit/984d1ba2d5a859b7ed338ef26399c2ba8a213354))
* **workflows:** ignore PR validation if the PR is marked draft ([203ff9f](https://github.com/flxbl-io/sfops/commit/203ff9f7ffeba1d2352f4f93c7ecd3c9be3fbceb))
* **workflows:** status should not be green in draft PRs ([8e955bf](https://github.com/flxbl-io/sfops/commit/8e955bffd53a7f95984046655c59f3aaf75dfe25))

## [24.2.1](https://github.com/flxbl-io/sfops/compare/v24.2.0...v24.2.1) (2024-01-04)


### Bug Fixes

* **actions:** revert explictDependencyCheck ([72ff317](https://github.com/flxbl-io/sfops/commit/72ff3171f2418317fd25b0ad83c76c440cfedc71))

## [24.2.0](https://github.com/flxbl-io/sfops/compare/v24.1.9...v24.2.0) (2024-01-04)


### Features

* **actions:** impact checker to check for impacts on dependencyOn packages ([6590861](https://github.com/flxbl-io/sfops/commit/659086118be4acc158125e8fb62eed52710f46de))

## [24.1.9](https://github.com/flxbl-io/sfops/compare/v24.1.8...v24.1.9) (2024-01-04)


### Bug Fixes

* **workflows:** validate against scratch org not getting triggered ([ebd2ec1](https://github.com/flxbl-io/sfops/commit/ebd2ec1803125ed4ef426ea71c76e0cd703794e9))

## [24.1.8](https://github.com/flxbl-io/sfops/compare/v24.1.7...v24.1.8) (2024-01-03)


### Bug Fixes

* **actions:** fix incorrect substitution in email ([7cf2761](https://github.com/flxbl-io/sfops/commit/7cf27612d127ecc8c3f09d520ddf43f93135d41f))

## [24.1.7](https://github.com/flxbl-io/sfops/compare/v24.1.6...v24.1.7) (2024-01-03)


### Bug Fixes

* **actions:** fix incorrect substitution of '.' in dev email ([fa99680](https://github.com/flxbl-io/sfops/commit/fa996804a4f7a6ec6e0a883e8a508a13d536be93))

## [24.1.6](https://github.com/flxbl-io/sfops/compare/v24.1.5...v24.1.6) (2024-01-03)


### Bug Fixes

* **actions:** fix issue when the email id has short names ([7125dc3](https://github.com/flxbl-io/sfops/commit/7125dc356169b7cd6f51ad428d75a283704ea7f6))

## [24.1.5](https://github.com/flxbl-io/sfops/compare/v24.1.4...v24.1.5) (2024-01-03)


### Bug Fixes

* **cicd:** fix change name to id ([737b2ed](https://github.com/flxbl-io/sfops/commit/737b2edbbc1e7f11b7fde3d151520e45b7ce7851))

## [24.1.4](https://github.com/flxbl-io/sfops/compare/v24.1.3...v24.1.4) (2024-01-03)


### Bug Fixes

* **cicd:** add a workflow dispatch for debug ([9ea0bb9](https://github.com/flxbl-io/sfops/commit/9ea0bb96b8de2ac724e8266b7a5562d8b6a31c10))

## [24.1.3](https://github.com/flxbl-io/sfops/compare/v24.1.2...v24.1.3) (2024-01-03)


### Bug Fixes

* **cicd:** change variable to releases_created ([64f0c20](https://github.com/flxbl-io/sfops/commit/64f0c207938fa1b14ea72b97a237d66f3d078fad))

## [24.1.2](https://github.com/flxbl-io/sfops/compare/v24.1.1...v24.1.2) (2024-01-03)


### Bug Fixes

* **cicd:** remove sync from build ([349ee8a](https://github.com/flxbl-io/sfops/commit/349ee8affb7dd723cbafe968fbbf1eea18764532))

## [24.1.1](https://github.com/flxbl-io/sfops/compare/v24.1.0...v24.1.1) (2024-01-03)


### Bug Fixes

* **cicd:** sync to customers only after release please action is run ([62105e8](https://github.com/flxbl-io/sfops/commit/62105e84e4d2cbb499e9e36c734ccb06640d7323))

## [24.1.0](https://github.com/flxbl-io/sfops/compare/v24.0.0...v24.1.0) (2024-01-03)


### Features

* **cicd:** ensure sync only when release please is triggered ([3c724d7](https://github.com/flxbl-io/sfops/commit/3c724d77cb757f546c0e72feb7a0f428c3c38930))
* **scripts:** ensure changelog and version is copied ([9f7b073](https://github.com/flxbl-io/sfops/commit/9f7b0736cbb272d939b0757e523813fc4492c2b0))

## 1.0.0 (2024-01-03)


### Features

* add a base branch ([bb4708c](https://github.com/flxbl-io/sfops/commit/bb4708c4a0a4741a6e3135dc9d7d9dfeea8646ac))
* add a branch name ([dded361](https://github.com/flxbl-io/sfops/commit/dded3614e40e4001ee0b712bc30dcd63215851b7))
* add a fork of jira-lint ([1a19a25](https://github.com/flxbl-io/sfops/commit/1a19a255290a125da616da706bb595c31801a06a))
* add a forked version of lock ([4080fdd](https://github.com/flxbl-io/sfops/commit/4080fdd98d3d0dc9979d3be770ce4a999724403c))
* add a locked json ([a6d3e89](https://github.com/flxbl-io/sfops/commit/a6d3e89bb153a0197145135b8ab6db2ae030e90d))
* add a new action to find release defn ([9dff892](https://github.com/flxbl-io/sfops/commit/9dff8923195e86a7e0bc5fd9fb2aabddb0eb4ed8))
* add a reusable workflow for branch base deployment ([3358b58](https://github.com/flxbl-io/sfops/commit/3358b588f990c5bde120dd583727dad6fc8bdb20))
* add a web image url unfurl asset ([1bad22a](https://github.com/flxbl-io/sfops/commit/1bad22ace45ae4399543b04d6003571981c418b5))
* add ability to forcetest ([2e910ea](https://github.com/flxbl-io/sfops/commit/2e910eaa8c180a9de3f37ff40bd4ca7a1275fd0e))
* add additional flag ([bd1812e](https://github.com/flxbl-io/sfops/commit/bd1812e8d2981448a12d20387821c79c223092b6))
* add an action to remove assignments ([00ebff5](https://github.com/flxbl-io/sfops/commit/00ebff52af000b06c8d7f512ca6db8aba2ae0232))
* add an action to set checkruns status ([0c721f5](https://github.com/flxbl-io/sfops/commit/0c721f50beb2503143778fe7bceb23d58b5c6a86))
* add an actionlint ([de56435](https://github.com/flxbl-io/sfops/commit/de5643578e81713c2d360ea2ccca18efee0a306f))
* add an indicator for new tab drop ([7110c1f](https://github.com/flxbl-io/sfops/commit/7110c1f3f308bad391263d20a22cf162c189f09e))
* add an initial version ([7b99172](https://github.com/flxbl-io/sfops/commit/7b991728800ae105e26414c6922ffed911a40b19))
* add an optional toggle for source pkg override ([70e976d](https://github.com/flxbl-io/sfops/commit/70e976d6ededd0b6c2de9404f6b06352f78e8be6))
* add branch to sandbox pool ([057aad2](https://github.com/flxbl-io/sfops/commit/057aad2a82983bc6085407c3e9cdc8477ff983e0))
* add cleanup workflow runs ([f6bbb30](https://github.com/flxbl-io/sfops/commit/f6bbb30c6a066edb38ba1fd232207148225e5291))
* add color codes to sandbox availability ([2b1869a](https://github.com/flxbl-io/sfops/commit/2b1869a2682ceab97fd010c03db4508b3fb98fac))
* add dependabot scanning ([7f3780a](https://github.com/flxbl-io/sfops/commit/7f3780a14af490fd8050c0fe2084b03b0db976bd))
* add deployment status update to build -test workflows ([6fe4a6a](https://github.com/flxbl-io/sfops/commit/6fe4a6a4f983caa11eaa62160e3fd1695bb9055f))
* add featur to renew org ([cf56949](https://github.com/flxbl-io/sfops/commit/cf56949149f49830c81a562d65d05ab1deada8fd))
* add future availability of sandboxes ([bd92639](https://github.com/flxbl-io/sfops/commit/bd92639a2e85d5094a0c85fb0e179bfa8029f1bb))
* add husky as pre commit ([90d998d](https://github.com/flxbl-io/sfops/commit/90d998d79d8be5ce8a439d982f39720f72626a4e))
* add info cards on availability ([7e1101a](https://github.com/flxbl-io/sfops/commit/7e1101a7f021010682dde8e2ddf3bc58fdf2b220))
* add instruction on renew comment ([0d054d4](https://github.com/flxbl-io/sfops/commit/0d054d4fe4c5b00e168afd9909d6ebc91ee7da4e))
* add issue number to lock ([dea6a91](https://github.com/flxbl-io/sfops/commit/dea6a91d3c0f1c83bf1888ffb70ad1e3b226eb44))
* add missing vars ([df034a3](https://github.com/flxbl-io/sfops/commit/df034a3eb93c779a61af6d3776ef8bf0b85c0b93))
* add new gh metric reporter ([bc8ba28](https://github.com/flxbl-io/sfops/commit/bc8ba2843fbe59bc81f257183e7ba0f1a02a465e))
* add on push jobs ([508a3fc](https://github.com/flxbl-io/sfops/commit/508a3fcd8d7ebd7756d67af9ca7e6121d08431d3))
* add option to delete ([2c6a1a2](https://github.com/flxbl-io/sfops/commit/2c6a1a20a3ed7036cfbe26c98cbe91b9bf70db26))
* add package visualisation to dashboards ([5d39704](https://github.com/flxbl-io/sfops/commit/5d3970489f4a244c0a37dce04cce308942dfc970))
* add pr validation status ([b063157](https://github.com/flxbl-io/sfops/commit/b063157464148f71ce172d8cfbf1c19433f89557))
* add reviewSandbox ([2688efb](https://github.com/flxbl-io/sfops/commit/2688efb9be69e89480e739c7503ade1cc8f85086))
* add safe directories ([a2b4dc3](https://github.com/flxbl-io/sfops/commit/a2b4dc35f09af39c34767c5ca4947763b24164eb))
* add sandbox status report ([c46754c](https://github.com/flxbl-io/sfops/commit/c46754c92bf6fb9bde56c0e0e0030f72e5731089))
* add scratch org reporting ([0320ccb](https://github.com/flxbl-io/sfops/commit/0320ccbd95b570ea2f5c7a7487c93ac93a358d14))
* add scratch org status and markdown ([eb0de44](https://github.com/flxbl-io/sfops/commit/eb0de445b9c146f3f46c60ff76a58541314e161f))
* add snapshot environments ([c3f160e](https://github.com/flxbl-io/sfops/commit/c3f160e9feb0a516b892d7eb7677851ad0e8a75b))
* add support for source tracking reset ([0cb2bd2](https://github.com/flxbl-io/sfops/commit/0cb2bd2f04257e38a868c0ab99075f4a33653102))
* add support for test run only orgs ([6c6ab47](https://github.com/flxbl-io/sfops/commit/6c6ab477e084dcab551cc13ac0c8fcf5aad2c72e))
* **all:** add a new feature to refresh front door url for assigned sandboxes ([9e6e601](https://github.com/flxbl-io/sfops/commit/9e6e6010b55ed7d45da93f9944b2fc0fdc2ad392))
* **all:** improve hotfix workflow ([ce1d207](https://github.com/flxbl-io/sfops/commit/ce1d207bda5f88b080a0e1bea4fb2ddd96c08bb0))
* branch deployment reporter ([3cbfe0a](https://github.com/flxbl-io/sfops/commit/3cbfe0a139f9bcaa88fa2c4fb70f29954f7e0ab3))
* change husky to prelint ([e1606ba](https://github.com/flxbl-io/sfops/commit/e1606ba26207c50c5232442209a4f7709b5d19c9))
* **ci:** add release-please workflow ([d02574b](https://github.com/flxbl-io/sfops/commit/d02574b15977881aee40a5757089949091d88381))
* cleanup dashboards to make it easy to navigate ([7394a16](https://github.com/flxbl-io/sfops/commit/7394a166fc57a97ccb3dc1478a23c037b85712fa))
* convert jira linter to reusable ([b737b18](https://github.com/flxbl-io/sfops/commit/b737b18a9e4a7a8069370dbdfb08da6476fef8e7))
* **dashboard:** add expiry date to developer sandboxes ([04125d2](https://github.com/flxbl-io/sfops/commit/04125d271bf8eb20a89c55e1c7f7bceb15b3f430))
* **dashboard:** process hotfix branches ([d12163a](https://github.com/flxbl-io/sfops/commit/d12163aae758c768660c80f4c5a7263481b922fc))
* **dashboards:** add infocard to developer sandboxes ([d1c0427](https://github.com/flxbl-io/sfops/commit/d1c0427eddeea4069b5ff422bae6aae0a7e446bc))
* display domain if available ([c192ac2](https://github.com/flxbl-io/sfops/commit/c192ac231e7aec132163f6100d523df98669cc74))
* display sandbox status ([13e10df](https://github.com/flxbl-io/sfops/commit/13e10dfdbb8f0c3181d26cd45be716f48e92f879))
* drop in update to project workflows to support github pat ([62af413](https://github.com/flxbl-io/sfops/commit/62af413d1c002e0fc5cedf99cc92f29032325911))
* fix any app related token issues ([f6e0a14](https://github.com/flxbl-io/sfops/commit/f6e0a1401e2af4ac0bc0570a7c1f94d3d9457b67))
* fix deployment Status ([ec9c456](https://github.com/flxbl-io/sfops/commit/ec9c45623e3e3b9e520e1f28df6ed34f51b5e767))
* introduce async dev sandbox provisioning ([239e74e](https://github.com/flxbl-io/sfops/commit/239e74e543bdd162de6da5a3d63d2c8e41f4e008))
* make createDev Sandbxes async ([a4c6697](https://github.com/flxbl-io/sfops/commit/a4c6697974327d4384acd192302111678a606507))
* modify reusable workflows for Github PAT ([f08a24c](https://github.com/flxbl-io/sfops/commit/f08a24c18a3d32baffe14227422c48b778db9131))
* modify reusable workflows for Github PAT ([f08a24c](https://github.com/flxbl-io/sfops/commit/f08a24c18a3d32baffe14227422c48b778db9131))
* modify reusable workflows for GIthub PAT ([9f1d630](https://github.com/flxbl-io/sfops/commit/9f1d6308467a1785f06f62dee4c956547bba073a))
* move to action based comments ([b3c8c29](https://github.com/flxbl-io/sfops/commit/b3c8c29be690ad995415aeb4bdd08ce80cffc48e))
* move to issue assignment ([b6ecb66](https://github.com/flxbl-io/sfops/commit/b6ecb666625904eec5fbed94d188041beb753ffe))
* only deactivate if requested explictly ([dd2e15f](https://github.com/flxbl-io/sfops/commit/dd2e15f3dce5607db9dddd208554a5f2c70fff90))
* refresh comment ([ff2aa8b](https://github.com/flxbl-io/sfops/commit/ff2aa8ba5318f7eb212ece2693f8a32cbfeb5047))
* **reusable-workflows:** add names to execute jobs ([a161a36](https://github.com/flxbl-io/sfops/commit/a161a3698387e0b9dd8378af9d995c673558474b))
* revamp to use environments ([0194e9e](https://github.com/flxbl-io/sfops/commit/0194e9e162391e36956b47e5bec2771da5a06503))
* **scratchorgs:** update dropdown with pool selector ([49b0ace](https://github.com/flxbl-io/sfops/commit/49b0aceb0453e644ea9f4e5d7f9c584879470477))
* style workitems and update fonts ([e04b22b](https://github.com/flxbl-io/sfops/commit/e04b22bfecafd0ce3aa17894f63afe9b451b1bc5))
* update check status and faster unlock ([62c03c7](https://github.com/flxbl-io/sfops/commit/62c03c71c9e342cfa256f70b323c18486f8dc1dd))
* update LICENSE to BSL ([c94fe9d](https://github.com/flxbl-io/sfops/commit/c94fe9d5598d4e6a90286a29c7f7f4adb3b3208b))
* update logo and add app header ([1e9acca](https://github.com/flxbl-io/sfops/commit/1e9acca73f19681681d4a82cc8f7b6b9b3ddb887))
* update package locks ([e72dc20](https://github.com/flxbl-io/sfops/commit/e72dc20ad42f86d0297ed323109f6695fda6098b))
* Update project workflows ([e93a788](https://github.com/flxbl-io/sfops/commit/e93a7885eed1f914f12cc90de4ad7f327b9ea0b4))
* update to recent enhancements ([614956e](https://github.com/flxbl-io/sfops/commit/614956e56db7d759b81c6e4f17d0b683d167dd7f))
* **workflows:** add support for package installation keys in scratch org pools ([ef5d9b9](https://github.com/flxbl-io/sfops/commit/ef5d9b9ca6da3e6fa060dd681584183aa3b9173c))


### Bug Fixes

* acd action lint installation ([3820ee7](https://github.com/flxbl-io/sfops/commit/3820ee7afc7cf9b9cb5df8ad954715de45b2f881))
* **actions:** add a console log ([bac33ab](https://github.com/flxbl-io/sfops/commit/bac33ab32a554c282ed895df03a5869bcf640922))
* **actions:** add a debug output ([74069bb](https://github.com/flxbl-io/sfops/commit/74069bbb44832f964cc9ca13df32f5dbf4c9057a))
* **actions:** add an initial comment ([e8220f5](https://github.com/flxbl-io/sfops/commit/e8220f5780adfbae9aed69500bea125f46c7b827))
* **actions:** add error handling to variable parsing ([227316e](https://github.com/flxbl-io/sfops/commit/227316e10063446c478c5c0467a7b3e3ba7c57e2))
* **actions:** add missing gh_token and error handling when variables are null ([7a673e1](https://github.com/flxbl-io/sfops/commit/7a673e194fa754b088c86d85b94d341603df4956))
* **actions:** add missing notice on createDevSandbox ([268c574](https://github.com/flxbl-io/sfops/commit/268c5748c7e8a904e562e804e6ac145c9ab1c960))
* **actions:** add more debug statements ([cd8b5f5](https://github.com/flxbl-io/sfops/commit/cd8b5f514286f595bb7cb43fb7d28d6b06b9502b))
* **actions:** add pagination to expiry ([fd98495](https://github.com/flxbl-io/sfops/commit/fd984954c8ac5ac7421c9cd72b6668815748bbab))
* **actions:** add timeout to github command ([758efdb](https://github.com/flxbl-io/sfops/commit/758efdbf9341473d0b6cae435b54b4358e1b36b3))
* **actions:** better expiry logic for sandboxes with extend mechanism ([a458e8f](https://github.com/flxbl-io/sfops/commit/a458e8f2e262097386bc1dd8378cba12d5e2f43a))
* **actions:** change to run command ([3f64f2b](https://github.com/flxbl-io/sfops/commit/3f64f2bee3c6c9ea02b0adf55021c6fbd7ff12ee))
* **actions:** ensure check sandbox has a timeout for 10 seconds ([91257ba](https://github.com/flxbl-io/sfops/commit/91257ba4fc53eec2e1f88c0e522a64d94ca4253b))
* **actions:** ensure gh_token is set in env for using gh_cli ([6fc202a](https://github.com/flxbl-io/sfops/commit/6fc202a53644ccc8a760747c718ab0985f82133f))
* **actions:** ensure github variable is deleted when sandbox is deleted ([966fb6c](https://github.com/flxbl-io/sfops/commit/966fb6c9718525cbef486df75c8fb21ff2002302))
* **actions:** ensure paginate across whenever variables are consumed ([181944a](https://github.com/flxbl-io/sfops/commit/181944a4b88afe12989bf90fd8612036f8e76ce2))
* **actions:** ensure releaselogs are copied from prod for hotfix ([4ef2128](https://github.com/flxbl-io/sfops/commit/4ef2128f6a016d5d91dddf96fdc25eccfc84edea))
* **actions:** ensure the path of patched releaselogs into domain ([b17c7fd](https://github.com/flxbl-io/sfops/commit/b17c7fd728d1721a5abd285b9ae10d180c104683))
* **actions:** fix checkSandbox incorrectly exiting when no developer sandboxes are assigned ([400474a](https://github.com/flxbl-io/sfops/commit/400474a9d4223db2ea45b9aeeceef66560c8fcdd))
* **actions:** fix incorrect alias used ([7847f11](https://github.com/flxbl-io/sfops/commit/7847f11ff90b9cad6ba67865e9fb16471f23013c))
* **actions:** fix incorrect error handling with renew and extend ([4d38e20](https://github.com/flxbl-io/sfops/commit/4d38e20a76df6f82d1a5f711a5bce1fdce38b40b))
* **actions:** fix incorrect name used in action ([562fd24](https://github.com/flxbl-io/sfops/commit/562fd24e72d9ca281da2c43fe16a560b528c3692))
* **actions:** fix incorrect parsing of values ([ff34010](https://github.com/flxbl-io/sfops/commit/ff340108102170aabba6773890eb135eb3b870e2))
* **actions:** fix incorrect referral to Delete Sandbox ([23b501a](https://github.com/flxbl-io/sfops/commit/23b501ab6ce5621df051d922cfab1b3d6620ef53))
* **actions:** fix incorrect sandbox allocation ([a396290](https://github.com/flxbl-io/sfops/commit/a39629093ebe9d93424e3cdc223dcef62a1552db))
* **actions:** fix incorrect var defn ([bfebaa6](https://github.com/flxbl-io/sfops/commit/bfebaa628fe760912496b7ecf292fada71b32a73))
* **actions:** fix install gh-merge-json for refreshUrl ([1a4d362](https://github.com/flxbl-io/sfops/commit/1a4d362aa10bb0847cafeb03aa1ea9b70620857e))
* **actions:** fix missing addition of gh merge ([348c804](https://github.com/flxbl-io/sfops/commit/348c804d2430c891a94a3524b151a93711d2c616))
* **actions:** fix refreshFrontDoorUrl to be accurate ([cf75adc](https://github.com/flxbl-io/sfops/commit/cf75adc1a2bdc5088a47d1de30d31c63d70b185d))
* **actions:** fix token expiry when tests take longer to run ([604f118](https://github.com/flxbl-io/sfops/commit/604f1189d11696d74901a9a1abe4b2c17ff980d7))
* **actions:** gh fails to return merged entities when paginated ([3a56337](https://github.com/flxbl-io/sfops/commit/3a563373f96abaeaded9d2d510c2848e9c3645d1))
* **actions:** handle logic when sanbox is already expired ([565b9b8](https://github.com/flxbl-io/sfops/commit/565b9b83a661cbdc87f4508f824ab966e14c042e))
* **actions:** incorrect json parsing at sandbox status reporter ([0088670](https://github.com/flxbl-io/sfops/commit/0088670cc51d30e1eb6e31b365d283ca9d844323))
* **actions:** incorrect output and incorrect action assignment ([e95b54d](https://github.com/flxbl-io/sfops/commit/e95b54d471704a419827dabf0eaaec6a43377009))
* **actions:** incorrect syntax in git configuration ([8a7a34f](https://github.com/flxbl-io/sfops/commit/8a7a34f93e0f489ee51076172943c8f5228d8d39))
* **actions:** lock only if there is not a inuse org ([8b726d0](https://github.com/flxbl-io/sfops/commit/8b726d061d963a82174f3ebaeb3d792f5df295d3))
* **actions:** package visualization should support both yml and yaml ([10d5675](https://github.com/flxbl-io/sfops/commit/10d567528d1aabda0406b0cfa30e08b486575518))
* **actions:** remove node deps from this action ([3a5ef55](https://github.com/flxbl-io/sfops/commit/3a5ef551724da8caab846eba53885e3a41369b07))
* **actions:** remove un necessary logs ([59107b0](https://github.com/flxbl-io/sfops/commit/59107b0771988b529a15d0e465241f0559e7acc6))
* **actions:** use jq correctly after using json-merge ([72553e9](https://github.com/flxbl-io/sfops/commit/72553e9e8185b424e577e3970b08416744d6f116))
* add .vscode to git ignore ([d30b31b](https://github.com/flxbl-io/sfops/commit/d30b31b7bd493206ee0e3066f095a9867b9af755))
* add a 2 second delay and logs ([892c56d](https://github.com/flxbl-io/sfops/commit/892c56d79ff20627eb513b08de21b7816cc35977))
* add a check not to trigger creation ([d77e91d](https://github.com/flxbl-io/sfops/commit/d77e91d5c4d2d824e19a67087b57b02ce4f689ea))
* add a check when issueStatus is null ([730a249](https://github.com/flxbl-io/sfops/commit/730a24961e7365791ccab68bde50fce4308bf2b8))
* add a log ([a64986c](https://github.com/flxbl-io/sfops/commit/a64986c15c584c760619bcbfc02c42d7c8197875))
* add a log for displaying matched check id ([43a7c08](https://github.com/flxbl-io/sfops/commit/43a7c08c58415bbf5f82dc113b1a952e3632e524))
* add a message saying this is only for sandboxes ([85d8f55](https://github.com/flxbl-io/sfops/commit/85d8f55fcc6bffb15e9966694a84ad83e37be057))
* add a process exit with success ([16a70da](https://github.com/flxbl-io/sfops/commit/16a70dad241270e1c77959e4af793d93dfa12eca))
* add a version check ([79efdbd](https://github.com/flxbl-io/sfops/commit/79efdbd2d515eba051c6247d2d03441a43ba47e7))
* add a workspace to findReleaseDefn ([45f8476](https://github.com/flxbl-io/sfops/commit/45f84769dbf17b8d42f3eb5048e1d7890461d1e7))
* add additional debug statements ([9351c70](https://github.com/flxbl-io/sfops/commit/9351c7009a5cff34a70f4d32cfb7fd0568c360e1))
* add additional error handling ([99cbecc](https://github.com/flxbl-io/sfops/commit/99cbecc50ac6e1f01bd43d9ed85c796dbc0532ef))
* add additional logs ([7bc4d92](https://github.com/flxbl-io/sfops/commit/7bc4d92b8b6acda4d40f38557aa3e414b0e4bf7a))
* add additonal plugins ([57ca532](https://github.com/flxbl-io/sfops/commit/57ca53270e01225111b309e6270dc956bf50e58b))
* add additonal unlock status ([d7f6269](https://github.com/flxbl-io/sfops/commit/d7f6269db312274d67f6bf7ff2000f1f3fe5f7be))
* add an additional app token ([d69d735](https://github.com/flxbl-io/sfops/commit/d69d735b5b6267c49c27989e299a9aa0d31c100a))
* add an additional flag ([aa4bb9c](https://github.com/flxbl-io/sfops/commit/aa4bb9c1c03bc52bb62825d2ba9b01113c14c328))
* add branch and error handling ([9af7f26](https://github.com/flxbl-io/sfops/commit/9af7f26c4aaefda4960fc3f73468228a20741821))
* add branch if not provided ([5dd2392](https://github.com/flxbl-io/sfops/commit/5dd2392d9a06d763fe723d1c278acb3f13f46b18))
* add branch to expire sandbox ([34371c5](https://github.com/flxbl-io/sfops/commit/34371c5cc5020cf66cc934964a86dc204a8e47b1))
* add branch to lock ([36fad37](https://github.com/flxbl-io/sfops/commit/36fad37c35a400bdffcba39c426ee09ace7ccee6))
* add branch to releaseName fetcher ([5f1872c](https://github.com/flxbl-io/sfops/commit/5f1872c380cd82330b44e1b7f39d5196d76ca42f))
* add build for checkCiSandboxStatus ([a91d199](https://github.com/flxbl-io/sfops/commit/a91d199150fee419d1659ea76d308152cd6a4f10))
* add build job to combine packages ([6d0f1c5](https://github.com/flxbl-io/sfops/commit/6d0f1c5816b50e26bb955de5f16b61ebda6fcc30))
* add continue on error true temporarily ([a2c04a7](https://github.com/flxbl-io/sfops/commit/a2c04a74ec09d8a20c95a2a104ab67c1ee61a27e))
* add dashboard repo ([131d497](https://github.com/flxbl-io/sfops/commit/131d49799744f16c4f1f02edca056fdb6b62f232))
* add env specific auth url ([f10cdc7](https://github.com/flxbl-io/sfops/commit/f10cdc72ae46089862bbd60c99363dbae18e8a2d))
* add env variables to apex test ([d7c2866](https://github.com/flxbl-io/sfops/commit/d7c2866e448e93f099765301e5f18ec4c14392ba))
* add env_sfdx_auth_url to apex tests ([f5d77d8](https://github.com/flxbl-io/sfops/commit/f5d77d8967f631131623b40efee1b3d2649cb472))
* add environment to test ([7c084ec](https://github.com/flxbl-io/sfops/commit/7c084ece1111574d73636f97cd0be8d980c4b446))
* add explict auth ([04f03b6](https://github.com/flxbl-io/sfops/commit/04f03b6b243c9264dc349701b2c4ec503ab523ad))
* add explict scope to auth ([8094d6a](https://github.com/flxbl-io/sfops/commit/8094d6a10962bfed4deeaafda94031dfb2729f2e))
* add eyes to reaction ([61c658c](https://github.com/flxbl-io/sfops/commit/61c658c9d48c5549374dc492adabfee84059fa3f))
* add fetch depth to reusable workflows ([2703506](https://github.com/flxbl-io/sfops/commit/2703506b87aec535fd0e17210736275b741ec66e))
* add forced status ([0a41969](https://github.com/flxbl-io/sfops/commit/0a419697f264639d030a753f390cf7777606ad83))
* add forcetest to skip review ([dd26032](https://github.com/flxbl-io/sfops/commit/dd26032895ecfaee5c1fe271ca492ad8bd928d13))
* add future availability per pool ([3ca4fc1](https://github.com/flxbl-io/sfops/commit/3ca4fc18937392861ce0796989776e96ef4437ee))
* add git config ([6e8cac4](https://github.com/flxbl-io/sfops/commit/6e8cac436dd2770addfa78265529cd19b171b6ad))
* add github event number ([8d45ac6](https://github.com/flxbl-io/sfops/commit/8d45ac6370d3f85a5c62299629f10e039eb1852e))
* add intro section to PR ([8731f90](https://github.com/flxbl-io/sfops/commit/8731f90ad9e27cd10906388123703aa07366770d))
* add issue -check ([691327a](https://github.com/flxbl-io/sfops/commit/691327aaef4924cbd7050f540edf9b55daf8c396))
* add issue deployment number ([bd88dfc](https://github.com/flxbl-io/sfops/commit/bd88dfc09d7beb5fa60b8a0b4b63f7ec203a2ba1))
* add issue number correctly ([8bd7971](https://github.com/flxbl-io/sfops/commit/8bd7971162698c0532431abdee6549538b7e48a2))
* add lock file ([ea4786f](https://github.com/flxbl-io/sfops/commit/ea4786f1ea8c818c8fd88510292f6cccadf3fe1f))
* add metrics provider to all workflows ([5244f5c](https://github.com/flxbl-io/sfops/commit/5244f5ceaaab7c8bbbcf157fe1f8e5bd5dd2d45e))
* add metrics-provider ([213aa1a](https://github.com/flxbl-io/sfops/commit/213aa1a6ecd5e82a64c23670d72890956ffd0f4e))
* add missing await ([b45f115](https://github.com/flxbl-io/sfops/commit/b45f1153ead76cdacf5f7d6a3326fc4e9d14df61))
* add ncc to bundle ([803e2a5](https://github.com/flxbl-io/sfops/commit/803e2a57135d9ea79aec4afcdb964f632b0e398a))
* add origin to branchname ([fbc3c43](https://github.com/flxbl-io/sfops/commit/fbc3c43af36c4f1951fc481dbe938de6dc36183c))
* add other emotes to presets ([43e93fb](https://github.com/flxbl-io/sfops/commit/43e93fb7fc0dd7b51673a6eae64c38aa24f85802))
* add releaseName to seperate lock out ([a79d449](https://github.com/flxbl-io/sfops/commit/a79d449779d3802d5bffab5114402f74d559d713))
* add releaseName to status ([81aa540](https://github.com/flxbl-io/sfops/commit/81aa540d85515cd3b245379ad7d536dc08b3acf4))
* add repository path to retrieve branches ([c27fde4](https://github.com/flxbl-io/sfops/commit/c27fde4ff2c1533d61b8fdedaff93527b47748dd))
* add snapshot environment to build-test-publish ([065f6fd](https://github.com/flxbl-io/sfops/commit/065f6fd84f6c8b0e9e53b5865931819cb2917331))
* add some redundancy around creating a user ([b6ecc30](https://github.com/flxbl-io/sfops/commit/b6ecc30b1d0ca7b9371926a858ce360dcc83abd9))
* add stdio inherit to see whats happening ([f03e033](https://github.com/flxbl-io/sfops/commit/f03e0330337f049a0f17067d9a716d2da35cf5cc))
* add success comment ([c4ee366](https://github.com/flxbl-io/sfops/commit/c4ee36695eba1f53ec51dae797db800ebdf296c5))
* add support for force test ([5214ab0](https://github.com/flxbl-io/sfops/commit/5214ab0cbf347d0f0013758d03ad9266d0b5dcbd))
* add sync customer with an additional var ([6559185](https://github.com/flxbl-io/sfops/commit/655918509b254baded1be38b98f85e5fd4b598b2))
* add temporary workarounds to propagate  urls ([4d982d3](https://github.com/flxbl-io/sfops/commit/4d982d36c6ddd836d98cc27ae80f47273b3130f3))
* add thumbnail folder to ignore ([062d1e2](https://github.com/flxbl-io/sfops/commit/062d1e2191fe94d54bd3e2cae343bf4f8884a848))
* add type of jira ([c37c90d](https://github.com/flxbl-io/sfops/commit/c37c90dc1c3be2710c43dc7ba9ad284b7b0b494f))
* add up minimum runs to 0 ([cda87a4](https://github.com/flxbl-io/sfops/commit/cda87a4b94776a902a80153d3a4a0a9bac87361a))
* add warning to force push ([cf3849d](https://github.com/flxbl-io/sfops/commit/cf3849df535566766201b7b242b1a0dbb84315a5))
* **allocater:** ensure vars are paginated properly ([5decdc3](https://github.com/flxbl-io/sfops/commit/5decdc38f24c410049e55d24a46e1611b34e51e9))
* **allocater:** refresh token for allocater ([cdc3a0b](https://github.com/flxbl-io/sfops/commit/cdc3a0b288fe97d97b6a5cc42e4363185d883734))
* build - publish ([c1e6d46](https://github.com/flxbl-io/sfops/commit/c1e6d46240f644b997bcb49ca074b21410e2a18b))
* change default to sfops test ([e35d653](https://github.com/flxbl-io/sfops/commit/e35d653cf03047e9460944f0a00220107230b34f))
* change ownership ([7f45f17](https://github.com/flxbl-io/sfops/commit/7f45f17c5017b477901e3e9a7b9d28cd9d038593))
* change security permission of script ([a18469e](https://github.com/flxbl-io/sfops/commit/a18469e66e8a6a8df771514be21bac285a3fa9fb))
* change to pull request number ([560cced](https://github.com/flxbl-io/sfops/commit/560cced2e47cc1ff36562f4c66c01fe7198f52f6))
* **checkCISandbox:** incorrect profile name ([e097db5](https://github.com/flxbl-io/sfops/commit/e097db5585fed1adf8823f93beaafa8ee3cb1cfb))
* **checkSandbox:** add a display to name ([649ec1f](https://github.com/flxbl-io/sfops/commit/649ec1fa7cedbf3e2ab1d3a6126cc550efcccdd6))
* **checkSandbox:** add only 1 attempt ([f1eea2e](https://github.com/flxbl-io/sfops/commit/f1eea2eb30fddf49ee323c21ed3537fbbdd1d277))
* **checkSandboxes:** use pagination correctly ([70dfcc0](https://github.com/flxbl-io/sfops/commit/70dfcc044c983db3eff04b5102796d0461fc363e))
* **checkSandbox:** fix missing syntatic element ([ace55ae](https://github.com/flxbl-io/sfops/commit/ace55ae6a627d4f71cd14e587d4d350680840de1))
* **checkSandbox:** incorrecct json stringify ([68d5c75](https://github.com/flxbl-io/sfops/commit/68d5c75b049f2708e544b87009ba0f3ab0212ceb))
* **checkSandbox:** incorrect messageAssignement ([695c98e](https://github.com/flxbl-io/sfops/commit/695c98ee5b96f602a463d0e416b7e1f8c27329ed))
* **checkSandbox:** Incorrect variable to comment ([e55dd6b](https://github.com/flxbl-io/sfops/commit/e55dd6bd657bb0208545969669976f3f00202008))
* **checkSandbox:** reduce attempt to 2 ([d9caa2c](https://github.com/flxbl-io/sfops/commit/d9caa2cbcb0e0cafbb0fe44254ec30e1595472dd))
* **checkSandboxStatus:** add dedent to prettify coment ([9a1e120](https://github.com/flxbl-io/sfops/commit/9a1e120f60f0dee620a1c6213e08ba75f52fcdac))
* **cherrypicker:** fix cherrypicker to create labels ([bcbc408](https://github.com/flxbl-io/sfops/commit/bcbc4086562813733083f0ed84e4afebdec97cbc))
* **cicd:** fix incorrect syntax ([434d49c](https://github.com/flxbl-io/sfops/commit/434d49c2fd9ac9b33e7f31165ed99033c56550bc))
* **cicd:** fix test repo script location ([5a7f3bf](https://github.com/flxbl-io/sfops/commit/5a7f3bfada0e651fabbf61bdec52e40987208e2d))
* **cicd:** remove build stage for bundler ([8ddc341](https://github.com/flxbl-io/sfops/commit/8ddc341cdd98b55d6862ae9e3bc5c121ebc6b4c9))
* **cicd:** remove docker build to when required ([0d19b91](https://github.com/flxbl-io/sfops/commit/0d19b912ebeeabed1cb34056a2a0a6cf3bcf21cb))
* close pending actions workflo ([25d3343](https://github.com/flxbl-io/sfops/commit/25d3343d201c8eb410becb8ddbbfb04871590127))
* comment used on branchDeploy ([f24ed95](https://github.com/flxbl-io/sfops/commit/f24ed95166a78abc6a5a91dcbd20687ca3be43b3))
* comments flowing out when org is not available ([cd360a4](https://github.com/flxbl-io/sfops/commit/cd360a4c93086211254ef428ae68144c3ec9953a))
* composite action do not support ${{ ([5207a4c](https://github.com/flxbl-io/sfops/commit/5207a4cd5b5bfe81f39b755a2ae4efc19d812df7))
* converge push to branch ([8e4704a](https://github.com/flxbl-io/sfops/commit/8e4704ac3e832ff7489fd049e107bf24e9c3e906))
* create-dev-sandbox ([21ebdc5](https://github.com/flxbl-io/sfops/commit/21ebdc59529dbe99dcf4e55bcce53e341352df30))
* **createDevSandbox:** fix incorrect variables used ([6d0c37a](https://github.com/flxbl-io/sfops/commit/6d0c37af68c4397e21a215041f4acff6011359ba))
* **createPatchReleaseLogs:** fix do not create a new branch ([5816fba](https://github.com/flxbl-io/sfops/commit/5816fba5a0b3a443bfcf01513e61bed1baa79ad7))
* **createSandboxForDev:** remove incorrect usage of resolve ([099246d](https://github.com/flxbl-io/sfops/commit/099246dd64be8a721a4d11d2121733474c5aa69d))
* **createSandbox:** handle token correctly ([f3adcb7](https://github.com/flxbl-io/sfops/commit/f3adcb783cc8e61664886be6d602c7e009773ba7))
* **createUser:** ensure username is read correctly ([16a233f](https://github.com/flxbl-io/sfops/commit/16a233f85cefaec81fd7c6ba9aefa42d1740a2c6))
* **createUser:** incorrect id being parsed ([1aad78d](https://github.com/flxbl-io/sfops/commit/1aad78d63ee1cb6fc8022ae55557264d7fdcb6b7))
* **dashboard:** add an hours option to expiring soon ([7d48252](https://github.com/flxbl-io/sfops/commit/7d48252e9bc8387af78c490d54d04a3245bf184d))
* **dashboard:** add an unless mode for ready PRs ([bd4d028](https://github.com/flxbl-io/sfops/commit/bd4d02808f49bd34a09c29222fca897a38ce1cfc))
* **dashboard:** add an unless to workitems in ready state ([d115b02](https://github.com/flxbl-io/sfops/commit/d115b024097bf2047d78403c3f1c9ed4c1230a1f))
* **dashboard:** add fluid container to viewer ([2e4ace6](https://github.com/flxbl-io/sfops/commit/2e4ace6ab6175e449d7c8758c59ac51132464d7a))
* **dashboard:** add social unfurl to check whether github pages unfurl goes away ([840e750](https://github.com/flxbl-io/sfops/commit/840e750e91a53ab36ebf679ff4fe54f60c3c42ec))
* **dashboard:** add sorting for review sandboxes ([1dbd099](https://github.com/flxbl-io/sfops/commit/1dbd0993a33be02568020272c4b49334ef0e2f69))
* **dashboard:** do not remove buttons when sandbox is expiring ([c689b29](https://github.com/flxbl-io/sfops/commit/c689b292a14e0d06dfb6c509e191528407bde7cc))
* **dashboard:** ensure correct links are displayed ([5cbe12c](https://github.com/flxbl-io/sfops/commit/5cbe12c3e0f96651ffc354ddca46a2c20515d2af))
* **dashboard:** fix btn to primary ([c561810](https://github.com/flxbl-io/sfops/commit/c561810ede7a6b3434a40bbed6fb695f4af890d9))
* **dashboard:** fix display of changed artifacts ([2f5da73](https://github.com/flxbl-io/sfops/commit/2f5da738fd29bc28ba8d0aabd5653a13491dae2f))
* **dashboard:** fix incorrect mesasging ([b8e56c6](https://github.com/flxbl-io/sfops/commit/b8e56c6f75a898f69563017997a090ff5d2823f1))
* **dashboard:** fix message on expring sandboxes for dev ([60c0fb3](https://github.com/flxbl-io/sfops/commit/60c0fb3cfa93a25d09eb2b7172b7c3db5aea2165))
* **dashboard:** make the button small ([bd203f5](https://github.com/flxbl-io/sfops/commit/bd203f50ecd44dcbfa412ac5ae668c6c9d507f53))
* **dashboard:** make the table flud to prevent rows from big ([45620db](https://github.com/flxbl-io/sfops/commit/45620db751d52278e2b1c52c6acabb7e695f7620))
* **dashboard:** move to dribble's cdn for new tab ([927bf06](https://github.com/flxbl-io/sfops/commit/927bf06e4408ccf6b81d8a855349d2572ae5c156))
* **dashboard:** move to nodeJs ([c2dd52f](https://github.com/flxbl-io/sfops/commit/c2dd52f6d621b70b74a55824c4ffe1d43cba8aa0))
* **dashboards:** fix date display in releases to allow sorting ([e9980fb](https://github.com/flxbl-io/sfops/commit/e9980fbc98acd637750dfbb7613aa48323238ddd))
* **dashboards:** fix ordering with dashboards first ([770c612](https://github.com/flxbl-io/sfops/commit/770c612b3c79a96d238ce1a7758733c0e994c995))
* **dashboards:** fix title used in sharing ([26eb746](https://github.com/flxbl-io/sfops/commit/26eb746950ca969480b45b46b7ac711bb0377f7f))
* **dashboards:** make table fluid ([9d99e09](https://github.com/flxbl-io/sfops/commit/9d99e09fd7ca72b09c677e354e2eb9e595eb5492))
* **dashboards:** modal not displaying ([79b464f](https://github.com/flxbl-io/sfops/commit/79b464fa039663fd5380ea3061117ff7fce07f96))
* **dashboard:** update css of the package vieewer ([edf88e0](https://github.com/flxbl-io/sfops/commit/edf88e0c39fd1d6b7ce77855017002ee45112c10))
* **deleteSandbox:** prettify logs ([007e490](https://github.com/flxbl-io/sfops/commit/007e490f87d6756992570aaa56ab2e768e1273f2))
* display comments if branch deploy  is valid ([464291e](https://github.com/flxbl-io/sfops/commit/464291eb305c3326d9e44c3efcfddf28d8bf8f53))
* do not delete .get in the target directory ([b7aa82f](https://github.com/flxbl-io/sfops/commit/b7aa82ff15cbe2cc3c2d062b47ca8e0dea6807a1))
* do not fail if base branch deletion is unsucessful ([791de9a](https://github.com/flxbl-io/sfops/commit/791de9a829b0028f64e241b01afb2f716723df39))
* do not fail when package evolution is missing ([5613702](https://github.com/flxbl-io/sfops/commit/56137022c9e91523d50005c28c7cf2174e43b5fa))
* do not lock if a sandbox is in use ([f9f6d37](https://github.com/flxbl-io/sfops/commit/f9f6d373014c9e1fb9d8124e06931b455e134ee9))
* do not refresh positions for intro mesage ([f0a8b73](https://github.com/flxbl-io/sfops/commit/f0a8b738147c8f47d5400144c2334a9ddefa46c2))
* do not reload iframes ([a7c6044](https://github.com/flxbl-io/sfops/commit/a7c6044898fbfabf4758baf48041a2ab7c4918c4))
* do not update release names ([3a00794](https://github.com/flxbl-io/sfops/commit/3a00794dbb77ba4acb68f52a739694244ffb5a8c))
* **docker:** ensure auth for gh bug ([57b289b](https://github.com/flxbl-io/sfops/commit/57b289bbce3e8ef32c5e1c5026d7b23256dd4bd7))
* **docker:** install on runtime ([c10314e](https://github.com/flxbl-io/sfops/commit/c10314e948b6fa418d61c69db69ed53cb8408bbf))
* **docker:** migrate images used to flxbl-io sfp ([b80b39d](https://github.com/flxbl-io/sfops/commit/b80b39df8baae5f9d38f992a3c839da6b32ff68e))
* **docker:** switch to stable image ([d2ce4c3](https://github.com/flxbl-io/sfops/commit/d2ce4c3e26e1a2168641bf831e6c940212c37a44))
* **docker:** use env variable and remove with --token ([d820efc](https://github.com/flxbl-io/sfops/commit/d820efceac3468be956ea7999af9fbafdc9887e3))
* ensure bash script is correct ([3d766a2](https://github.com/flxbl-io/sfops/commit/3d766a2779dde2bcdd889cfa3496f553b009fd66))
* ensure checkActions do not fail ([ec103d2](https://github.com/flxbl-io/sfops/commit/ec103d229bf4f34adc5e64413b97824ea2f1e04c))
* ensure correct variable is used ([1283160](https://github.com/flxbl-io/sfops/commit/12831607abc7460aec8bd796b5289ec24c43ffd3))
* ensure dashboard repo is everywhere ([80d2328](https://github.com/flxbl-io/sfops/commit/80d2328c402160004620b8e2565bf095590f8b04))
* ensure full remote url is read ([4f70f3f](https://github.com/flxbl-io/sfops/commit/4f70f3fd3b9f974f7ae9bae8c915ab4f8f10ce02))
* ensure reviews are required ([8bf7430](https://github.com/flxbl-io/sfops/commit/8bf74305a6bbbdc67ff7209791ce295590702989))
* ensure tags are visible ([2fbff3a](https://github.com/flxbl-io/sfops/commit/2fbff3a7708c237ca8b0d3b499ba077c9dc432ed))
* exclude git and node modules ([e7e96c2](https://github.com/flxbl-io/sfops/commit/e7e96c2e75f168077f63606bf1677d4137cb537f))
* exclude other data dirs ([b13d943](https://github.com/flxbl-io/sfops/commit/b13d943673b427b406a14352b7d7b6f3ab39bac7))
* expiry of sandboxes ([6330134](https://github.com/flxbl-io/sfops/commit/63301344213d059a6b64e2e58a6b5b4199393541))
* fetch sandbox var ([6b4dc21](https://github.com/flxbl-io/sfops/commit/6b4dc217ef62f264f7225f34d2afed1b1c1ebea5))
* **fetch:** fix sandbox fetch logic ([d57cea4](https://github.com/flxbl-io/sfops/commit/d57cea4bfcd5b2a48985e5a825d7ae561ef47b0d))
* **fetch:** incorrect repo parameter ([49c3f06](https://github.com/flxbl-io/sfops/commit/49c3f06dd2573f777806b05b23070a88b869da71))
* **fetch:** pass issue-number to fetch action ([6042a9a](https://github.com/flxbl-io/sfops/commit/6042a9a79162c60de69f99eebf3b09e128985418))
* **fetchSandbox:** add logs and return expired sandboxes ([50b38be](https://github.com/flxbl-io/sfops/commit/50b38be2e66b457b8e57d784ce3b84baf601dc6f))
* fix add conditions ([d6c5d17](https://github.com/flxbl-io/sfops/commit/d6c5d17b321d9f2f68f7043fdfb187a3c699163b))
* fix add missing dashboard repo param ([f9702cd](https://github.com/flxbl-io/sfops/commit/f9702cdee452ff5202e9e8633120985381c2f395))
* fix add path to outputs ([900377e](https://github.com/flxbl-io/sfops/commit/900377ed6d377b5dc20c003255188a857af2cd47))
* fix argument positionals ([bbf7efe](https://github.com/flxbl-io/sfops/commit/bbf7efed0eedff450ca157bfe5f098e63f733a2d))
* fix base ref ([c851c32](https://github.com/flxbl-io/sfops/commit/c851c32434286c3ef404be7fef51a58a8318afb2))
* fix bash syntax for if ([489fda7](https://github.com/flxbl-io/sfops/commit/489fda75cb6c899cea133f5c978d72b079aa8a2e))
* fix branch name used ([7cb7802](https://github.com/flxbl-io/sfops/commit/7cb7802b0fb8927360a3e6d342647e7108c5de41))
* fix comment to use issue number ([6a204ff](https://github.com/flxbl-io/sfops/commit/6a204ffc84806400d786b488ccd68ffc87c74175))
* fix comments and order of args ([c210623](https://github.com/flxbl-io/sfops/commit/c210623b06db1d484fcca3400a0af2c41af3bc2b))
* fix conclusion ([d1a4fda](https://github.com/flxbl-io/sfops/commit/d1a4fda11589f190fd260a0c887e1958ab384961))
* fix defaults ([c72b928](https://github.com/flxbl-io/sfops/commit/c72b9284fbe06574a65503ce89b143f3524b5ede))
* fix duplicate jobs ([0128890](https://github.com/flxbl-io/sfops/commit/0128890376834821f6e759c5c03041a96b0c5458))
* fix elaspsed time ([c9b8c18](https://github.com/flxbl-io/sfops/commit/c9b8c1832c727d90a60af07abdbf86762f18dbf2))
* fix headers to be consistent with semantics ([e86dead](https://github.com/flxbl-io/sfops/commit/e86deade88cf973707747b7c29ae14a4488196f6))
* fix icons ([e1c57ca](https://github.com/flxbl-io/sfops/commit/e1c57cad505775ea3a3a30266a2a53ba43553c89))
* fix incorrect output redirection ([b89d822](https://github.com/flxbl-io/sfops/commit/b89d8229935178524f31a54757ba978fca1c3a4c))
* fix incorrect syntax used ([78fe2d3](https://github.com/flxbl-io/sfops/commit/78fe2d33798103ca4daf3aa470cb5d87967ab386))
* fix incorrect syntaxt used ([dbfc460](https://github.com/flxbl-io/sfops/commit/dbfc460b9f9d41eae4707c5180e27b660d1d4d03))
* fix incorrect var used ([3b0b9ed](https://github.com/flxbl-io/sfops/commit/3b0b9ed164e0a895743be681fffa308049cbadd3))
* fix incorrect var used ([e70dcf5](https://github.com/flxbl-io/sfops/commit/e70dcf5a38b9dacdb96ce2c0455018ee1d0f5a6e))
* fix incorrect variable passing ([a5f57ff](https://github.com/flxbl-io/sfops/commit/a5f57ff502c1ce4560e65343f3b95d49762db0ea))
* fix incorrect variable used ([e5b511a](https://github.com/flxbl-io/sfops/commit/e5b511ae2a5df59dff0c259cf5e394222e2536c9))
* fix issue number ([2807b35](https://github.com/flxbl-io/sfops/commit/2807b35cb85f199c30e621a671a8cb9db93f4b91))
* fix issue with bash syntax ([4a97ae2](https://github.com/flxbl-io/sfops/commit/4a97ae2b69e3a9ce63a5e01115b846c9525a0e02))
* fix issue with missing dist and easier placement for test ([474a1a4](https://github.com/flxbl-io/sfops/commit/474a1a40106f831d3ebc73edfc187e2351f2588a))
* fix job name ([b56f64a](https://github.com/flxbl-io/sfops/commit/b56f64a53bd234f1761549025145afc552414898))
* fix lack of issue in forced test mode ([63edaa8](https://github.com/flxbl-io/sfops/commit/63edaa8b6b6a7d9a7e13852c814c6e47cf43d5cc))
* fix linter messages ([df3b790](https://github.com/flxbl-io/sfops/commit/df3b7907ee177a4cc31f498f8b18b748e422fba3))
* fix lock command ([a2df12d](https://github.com/flxbl-io/sfops/commit/a2df12dba2bf992a0f28917e0541047f4abc5233))
* fix name used ([ef5a69e](https://github.com/flxbl-io/sfops/commit/ef5a69e091cff18fa6293e420b00d8be27a79200))
* fix path used in findReleaseDefn ([f1b2463](https://github.com/flxbl-io/sfops/commit/f1b2463bdab02aae5cb737eb5fa72947e6aca04b))
* fix pool inputs ([ede1f2f](https://github.com/flxbl-io/sfops/commit/ede1f2f9cd021d95cc0df7ddaed3183349ac3d15))
* fix push to repo + incorrect reactions ([d7edf7d](https://github.com/flxbl-io/sfops/commit/d7edf7d08f5457e15b10a9d6080ebf6941beed26))
* fix release defn ([5b321d4](https://github.com/flxbl-io/sfops/commit/5b321d4581da6847ba0700278c8201ae1b5c36dc))
* fix remove deployments ([affb757](https://github.com/flxbl-io/sfops/commit/affb75780ba6b7f52e58952554f4813029083d7e))
* fix renew mesage ([adccce3](https://github.com/flxbl-io/sfops/commit/adccce34956343f1a336de6d1e8c50a99d0fb56a))
* fix scripts ([e68f410](https://github.com/flxbl-io/sfops/commit/e68f410aff376a84267955c75013b18e1464d6a9))
* fix scripts to use GH_TOKEN ([4338c19](https://github.com/flxbl-io/sfops/commit/4338c196652be32ef95015f08b9242620345d555))
* fix slight better handling ([4b3f072](https://github.com/flxbl-io/sfops/commit/4b3f072eec6b23483a8c7ba3936b2ca31ee1834f))
* fix status handling ([bf7e950](https://github.com/flxbl-io/sfops/commit/bf7e950d1e10138004688a21101cd3a369275cf5))
* fix status of issues ([6668838](https://github.com/flxbl-io/sfops/commit/6668838c09fb3e3033c7ddfe9e304fb47417fdcc))
* fix syntanx issue on condition ([b1c1468](https://github.com/flxbl-io/sfops/commit/b1c146809bb9f9e7e5e8b7fa99e18d5d4e1c498e))
* fix syntax error ([d0edf6a](https://github.com/flxbl-io/sfops/commit/d0edf6afa36361e599428ad395e2bb4eee9ab12d))
* fix syntax error on branch deploy ([f4bc212](https://github.com/flxbl-io/sfops/commit/f4bc212b12cd82a97bb7106d2aa160726c5031ee))
* fix syntax error on createSandbox ([c186dc4](https://github.com/flxbl-io/sfops/commit/c186dc4165a2362934365b79ac51c2ccdbf77a36))
* fix syntax in format ([12caa8f](https://github.com/flxbl-io/sfops/commit/12caa8fc8477d69e58c75b819739ceb0c6fd30c3))
* fix typo with action path ([3f90142](https://github.com/flxbl-io/sfops/commit/3f90142da35a5f2073c09e3b2a2dcc7bed54ca8a))
* fix typo with usage ([2b27897](https://github.com/flxbl-io/sfops/commit/2b278971a440eec492e5a13300132b047835c762))
* fix use of correct check name through out ([680f58f](https://github.com/flxbl-io/sfops/commit/680f58f2bae87b56f894fda4898ffa6e583e534a))
* fix workflow incorrectedness ([9362a9d](https://github.com/flxbl-io/sfops/commit/9362a9dc17a5b4ac05ecea5c913b6709451f942d))
* fix workflow syntax ([7e465fd](https://github.com/flxbl-io/sfops/commit/7e465fd97d46fa796aab52fd7c39ac0c9698ec54))
* fixy syntax error on branch deploy ([4aa2e14](https://github.com/flxbl-io/sfops/commit/4aa2e14e6880f382328bd275bd7cf6df158d766b))
* handle condition where runid is not available ([0de10ed](https://github.com/flxbl-io/sfops/commit/0de10edd2af8a812dacb851848ff53b944b752e7))
* handle no change scenario ([1b3bdb2](https://github.com/flxbl-io/sfops/commit/1b3bdb22c3d0265ed8f24b9ad8ea07c1de2e6b4f))
* handle unlocked ([ce352d2](https://github.com/flxbl-io/sfops/commit/ce352d2bce1ee6e63ed3374944e27ebe3dae7fc6))
* how files names are handled ([dc70c36](https://github.com/flxbl-io/sfops/commit/dc70c360c5031e0df45f125583c8e3ce1dcf09e7))
* if extension is not proided ([0e6c9ab](https://github.com/flxbl-io/sfops/commit/0e6c9aba026e06cca3ba09dbf316c2cb2d112dc2))
* incorrect branches and update status for each env ([75c13eb](https://github.com/flxbl-io/sfops/commit/75c13eba61b0f8865f8cc955f1ce1dcf2d6a8bd2))
* incorrect id name used ([c7fe44a](https://github.com/flxbl-io/sfops/commit/c7fe44a919fd73fb12017a6752b0bc77b50a1dc7))
* incorrect if syntax ([35c1ea7](https://github.com/flxbl-io/sfops/commit/35c1ea7c6f40c4ac28625b8624f3f8905a6842fb))
* incorrect path to domainCreator ([135587e](https://github.com/flxbl-io/sfops/commit/135587e6cc77274ef36272b184bc0a212e16e15e))
* incorrect pool name while release ([cf31ef9](https://github.com/flxbl-io/sfops/commit/cf31ef995c723ac1c7e7c8f2311343609f0b46f4))
* incorrect replacements ([8ed256f](https://github.com/flxbl-io/sfops/commit/8ed256f9bed69ffeb8ef4217f5a80def6ab17620))
* incorrect status header ([cdc3266](https://github.com/flxbl-io/sfops/commit/cdc32662e9de7c91ccdcd757ac4e5e05e51dc745))
* incorrect use of always ([5a62df2](https://github.com/flxbl-io/sfops/commit/5a62df24f71d69a097ff25e72b2c20c0711f0ae8))
* incorrect use of name and id ([b3e818f](https://github.com/flxbl-io/sfops/commit/b3e818f48db35d40e313a133ac991f0e62403560))
* incorrect use of variable expansion ([cd1ebff](https://github.com/flxbl-io/sfops/commit/cd1ebff94ace8539552a77d9f05f85d3bcd200ba))
* incorrect use of variables ([1623b11](https://github.com/flxbl-io/sfops/commit/1623b11ac5004aab74e15afea4bdc73a98ca1f7a))
* incorrect use of vars and name ([f4af349](https://github.com/flxbl-io/sfops/commit/f4af3491ea0f4f66e8b3807f5fb511bdf61e8cf8))
* incorrect variable assignment ([07f91f1](https://github.com/flxbl-io/sfops/commit/07f91f1091a04f81174ce64e81a35f15daf07434))
* incorrect variable usage ([b18ec5d](https://github.com/flxbl-io/sfops/commit/b18ec5debb5e89a1ecbdea5bb2e73b52a7792e51))
* incorrect variables used ([9afbdfb](https://github.com/flxbl-io/sfops/commit/9afbdfbf47d9c9e96748b65ba285df8ad4e6dcb4))
* lint errors ([2e259ec](https://github.com/flxbl-io/sfops/commit/2e259ec5d63e670a81620253fc8a759688aae01c))
* logs in delete Sandbox ([c6835b3](https://github.com/flxbl-io/sfops/commit/c6835b3d3529d6ca7536927bc89456fa3f8f7258))
* make branch to upperCase ([c4d0bb1](https://github.com/flxbl-io/sfops/commit/c4d0bb18651eba5eb978f5fe24c9e614bf999cbe))
* minor defects with workflows ([a6a2459](https://github.com/flxbl-io/sfops/commit/a6a24594415fefe68d39fe31266effbcd4778dab))
* missing dependency with type checks ([fbf62f8](https://github.com/flxbl-io/sfops/commit/fbf62f896d4772df044b5d43f030b992bf24c751))
* move creation of status check to new job ([3927989](https://github.com/flxbl-io/sfops/commit/3927989dc2be323d4ef57b3746425be65d972aaf))
* move fetch to node script ([1f49600](https://github.com/flxbl-io/sfops/commit/1f4960049647c2c513393c2c0c84960cdb3f4fca))
* move to async for dev creation ([227e353](https://github.com/flxbl-io/sfops/commit/227e35359e232af9bc4531cae1960849fb32b13c))
* move to async for sandbox ([637b840](https://github.com/flxbl-io/sfops/commit/637b840ddc4a94fae98bfc087a1bce5c044c1886))
* move to customer.repo_owner variable ([a1c38bc](https://github.com/flxbl-io/sfops/commit/a1c38bc34cbd3747b783ca0beaabdc21e0728c79))
* move to dashboard-repo ([d15b82c](https://github.com/flxbl-io/sfops/commit/d15b82cf12743665603acdd8067f5f570aa321d6))
* move to issue number ([9fb76a7](https://github.com/flxbl-io/sfops/commit/9fb76a7f5177686544df0b2894f00d9e19daf33d))
* move to mschick ([eacaf1d](https://github.com/flxbl-io/sfops/commit/eacaf1dc8536a90de44dddf6fd817342c9f95a60))
* move to recommended way of installing actionlint ([fd97e42](https://github.com/flxbl-io/sfops/commit/fd97e42aea7dc440f72c097f7390ee46ee9e1da6))
* move to reusable workflow ([f41c345](https://github.com/flxbl-io/sfops/commit/f41c345eee1c7a893bb2f1aafd3fd27a3ffa430d))
* move to use workitem for consistency ([860149c](https://github.com/flxbl-io/sfops/commit/860149cb2988a770c26303948e68fdbee16587be))
* move upstream changes ([91a6e2d](https://github.com/flxbl-io/sfops/commit/91a6e2d187e880fa8268cde6e800d6b7a06cc1db))
* org dropdown for apex tests ([9b38d5b](https://github.com/flxbl-io/sfops/commit/9b38d5ba6d96707ceeb0d2d12ca50e872b4b1399))
* **paginate:** ensure api is paginated ([cef2485](https://github.com/flxbl-io/sfops/commit/cef248515336c73bdb1005da78f952759587d708))
* path to github metrics workflow ([f677efe](https://github.com/flxbl-io/sfops/commit/f677efe8f9a235efdb6858c5997b1ae8a6ae6f6e))
* pnpm lock ([38eea12](https://github.com/flxbl-io/sfops/commit/38eea1222809eeb2656637ce1a49618a5e41d89f))
* **pr-validate:** fix for validate comments not displaying properly ([2bcaec2](https://github.com/flxbl-io/sfops/commit/2bcaec25e1fe3acfb82e5a4b3046decc35b056c8))
* **pr-validate:** incorrect location for if condtion ([2b32375](https://github.com/flxbl-io/sfops/commit/2b32375dc58235384321df2182ceae608af0bdf7))
* process in batches ([97d1f4a](https://github.com/flxbl-io/sfops/commit/97d1f4a136200d0b5c0c7c826d38118ca3e7faeb))
* **project:** fix typo with job ([927aba8](https://github.com/flxbl-io/sfops/commit/927aba88aa5c896c5ffad5cd47aac52f04ba852b))
* push branch status irrespective of build status ([203207c](https://github.com/flxbl-io/sfops/commit/203207c2fc0a1306b70f644734a7d944eb488a17))
* read usersToBeActivated from pool config ([ade7d3c](https://github.com/flxbl-io/sfops/commit/ade7d3c4e00a31812f1c46492bb21c35b78b055b))
* rearrange variable location ([7c7d798](https://github.com/flxbl-io/sfops/commit/7c7d798830c2c5bc98655dd5ee403723d830ca25))
* reduce max parallel to 1 ([b282a70](https://github.com/flxbl-io/sfops/commit/b282a705af89d102d66a4c96dcc1b1689ccdd3f9))
* refer correct token and url ([5decb72](https://github.com/flxbl-io/sfops/commit/5decb7208cfd9c5af78c1588afee981793937eb5))
* refresh github token ([e4649f9](https://github.com/flxbl-io/sfops/commit/e4649f9e1f097920708904abbccae531d92ecbd7))
* reintroduce existing workflow back ([7277533](https://github.com/flxbl-io/sfops/commit/7277533c588fdedbef9d1876efde52e6929876c9))
* release ci sandbox correctly ([abec41b](https://github.com/flxbl-io/sfops/commit/abec41b2aabe75302351c0ca88c867dde4321dc6))
* reload frames every 30 seconds ([e8152aa](https://github.com/flxbl-io/sfops/commit/e8152aaa4760adb0f2a5fb3aa1551c041c7f1835))
* remove branch on test runs ([02aa402](https://github.com/flxbl-io/sfops/commit/02aa4027e69d60a58f80337abd0290e5e1098d56))
* remove comments ([a6c03a8](https://github.com/flxbl-io/sfops/commit/a6c03a89b1980d19ccd7d409627f0057c2d16f6f))
* remove default plugins ([f5f40b8](https://github.com/flxbl-io/sfops/commit/f5f40b8126727f484e999d34c2b334758dc10d46))
* remove dependency on docker ([0441ba8](https://github.com/flxbl-io/sfops/commit/0441ba8205f2c4bd99c0990c1b51418c7ccc92a9))
* remove duplicated main ([a591d9c](https://github.com/flxbl-io/sfops/commit/a591d9c915a4e5deae84a53d365986f3d1577679))
* remove environment build docker ([3718e22](https://github.com/flxbl-io/sfops/commit/3718e221fffe02889fc9a5f3cfee708e1987ee83))
* remove fetch --all ([cd3cb07](https://github.com/flxbl-io/sfops/commit/cd3cb073e9c5400cfd0a0ea6e36c26d839864e54))
* remove incorrect conditions on error message ([87787b1](https://github.com/flxbl-io/sfops/commit/87787b143e01d8982d5bccc3ac6769d567da5858))
* remove incorrect slash ([d70d419](https://github.com/flxbl-io/sfops/commit/d70d4190ad9596131c53faccb800f4acc615d938))
* remove incorrect syntax ([b162318](https://github.com/flxbl-io/sfops/commit/b16231836f99947621c03823f128759ec4c6d882))
* remove invalid secrets ([dd8399b](https://github.com/flxbl-io/sfops/commit/dd8399b848cfa96e46f6c559001032f37e08f7f1))
* remove lib and add to .gitignore ([16bf9b6](https://github.com/flxbl-io/sfops/commit/16bf9b6f7745d9e786191670c0bf2c2011cb7502))
* remove lock ([4ef0e89](https://github.com/flxbl-io/sfops/commit/4ef0e8999dc50658e6a7ee57dbf226800bf917e4))
* remove output from job ([5dd5f9e](https://github.com/flxbl-io/sfops/commit/5dd5f9e7a2b1fbcc9c4db6ea54ef074b2d9796fa))
* remove requirement of branch ([772b3ba](https://github.com/flxbl-io/sfops/commit/772b3ba5855c2563646bb49ebd7a330d62541c5f))
* remove setting up origin ([1d1615f](https://github.com/flxbl-io/sfops/commit/1d1615fdc5c3845dbee58463645e14d1cdca63b9))
* remove unused actions ([223d778](https://github.com/flxbl-io/sfops/commit/223d7783feef9ad682281411b21684d91833850d))
* remove unused cp ([92cc8a3](https://github.com/flxbl-io/sfops/commit/92cc8a32f00655b1cb2978c306d7b52161ef4b6a))
* removed incorrect path to modules ([561276c](https://github.com/flxbl-io/sfops/commit/561276c2c37672fbc415e5d88ef9ca35a267365d))
* rename and hook workflows ([1304a47](https://github.com/flxbl-io/sfops/commit/1304a47c315b2ab416a935a5d8f416efe225a964))
* rename scripts ([2efe97d](https://github.com/flxbl-io/sfops/commit/2efe97dd631c3d4284b23b8df6ec40443e7d316f))
* reporing metcis string ([6d2c8ca](https://github.com/flxbl-io/sfops/commit/6d2c8cab87e21c59e442bf6cba12a54c985e9902))
* report branch status with head ref ([97b27aa](https://github.com/flxbl-io/sfops/commit/97b27aa5f3c8504a4eb938bb4fdfb799d01057ba))
* reusable workflo on build publish ([4de8592](https://github.com/flxbl-io/sfops/commit/4de85929657a66b38915412973c96c291b66940b))
* **reusable-worfklows:** skip if branch is release- ([bd9ae87](https://github.com/flxbl-io/sfops/commit/bd9ae871111ff8fd01b0d224a4767487b5fe5d96))
* **reusable-workflows,dashboard:** update to create branch info into dasbhoard ([dd199b1](https://github.com/flxbl-io/sfops/commit/dd199b154ddc399dd8b8082d3f491dccf50e9726))
* **reusable-workflows,project-workflows:** change branch configuraiton for release branch ([ac5426a](https://github.com/flxbl-io/sfops/commit/ac5426a913b1df3baeea2f1e56ebb487e7ad2dbe))
* **reusable-workflows:** add a comment if a branch already exists ([da313a0](https://github.com/flxbl-io/sfops/commit/da313a0db1f942eaf0d12de0599db3fb88642484))
* **reusable-workflows:** add an additional deletion of vars ([34175f8](https://github.com/flxbl-io/sfops/commit/34175f871bad283d4efd46fac44a11e2cb69350a))
* **reusable-workflows:** enure tokens are not getting expired when long running process are invoked ([7b44f90](https://github.com/flxbl-io/sfops/commit/7b44f904bb8683ee55afd700e92857aa0b82b5ab))
* **reusable-workflows:** fix  incorrect auth for other branches ([16bcb2e](https://github.com/flxbl-io/sfops/commit/16bcb2e8fac33f648154da4f7fb3e216f97e3830))
* **reusable-workflows:** fix branch name used across for release ([3a5a71a](https://github.com/flxbl-io/sfops/commit/3a5a71a0500179679a6504151440b6fd309fcc7b))
* **reusable-workflows:** fix incorrect branch variable ([3608fd9](https://github.com/flxbl-io/sfops/commit/3608fd93c25578862a8c7d63a7c427e76bcbe72d))
* **reusable-workflows:** fix issue title ([4979e28](https://github.com/flxbl-io/sfops/commit/4979e2822d8a0f4385ebb0ceab721992a5deea35))
* **reusable-workflows:** fix missing type ([829555e](https://github.com/flxbl-io/sfops/commit/829555ee87f849e6fb8b9290d3c21cfbe2f513da))
* **reusable-workflows:** fix to use NPM token ([c2c0fc9](https://github.com/flxbl-io/sfops/commit/c2c0fc9ad5e2a52636e39cf0ca8cf7129cbaaf86))
* **reusable-workflows:** fix typo with branch-deploy ([38b56d1](https://github.com/flxbl-io/sfops/commit/38b56d19cc966c810b724b28016ee8e341cfddd6))
* **reusable-workflows:** update patch workflow with changes in branch structure ([57530a6](https://github.com/flxbl-io/sfops/commit/57530a623508f7457f4220fdddc9f69a8b610fa8))
* **reusable-workflows:** validate when the base branch is release ([59eb5d3](https://github.com/flxbl-io/sfops/commit/59eb5d3ab16bfc2fe558d6c4e3363feb4db0388a))
* **reusable:** fix comments on dry run ([fee788b](https://github.com/flxbl-io/sfops/commit/fee788b4f25073521aba987f1ede206fc5e5e691))
* **reusable:** fix typo on syntax error with pool allocator ([8b2977b](https://github.com/flxbl-io/sfops/commit/8b2977bf398a82bb534e12497260db7d2da1efe9))
* **reusable:** fix typo with secrets ([7ca6d92](https://github.com/flxbl-io/sfops/commit/7ca6d92f3d2c64810ba93b720164a5988b3ecd15))
* **reusable:** incorrect action on package installer ([3c7edca](https://github.com/flxbl-io/sfops/commit/3c7edca27c400b7aea574f63a18e188372647aa9))
* **review:** add better colours and updated cards ([ba41d15](https://github.com/flxbl-io/sfops/commit/ba41d15e3c652991110455c5e262b3f0777b5e21))
* **review:** add missing sandbox checks css ([199a449](https://github.com/flxbl-io/sfops/commit/199a4495560bc05ce05f7b67bf7b9d08f46886df))
* **review:** discount in progress sandbox ([b50e3a5](https://github.com/flxbl-io/sfops/commit/b50e3a5a38234a299c302646c30ffe4bcbd62cd6))
* **review:** Ensure number is correct ([4fe35f8](https://github.com/flxbl-io/sfops/commit/4fe35f827a23f8911399eebdc447d1845df32fca))
* **review:** move semantic to unassign ([2d89227](https://github.com/flxbl-io/sfops/commit/2d89227f6776f4e1d041c5476837f39b732bf6bd))
* sandbox match regex ([056d40e](https://github.com/flxbl-io/sfops/commit/056d40e5a490b3e39949bf2f3b33c0802aebcce1))
* **sandboxStatus:** add creation date ([95022ac](https://github.com/flxbl-io/sfops/commit/95022aca528b67d97ec3af4e0a3362f8f1134367))
* setup branch-ref ([09b2112](https://github.com/flxbl-io/sfops/commit/09b211213f4156ac626807ffaaddf6e7508aeb81))
* setup correct inputs ([2d6a712](https://github.com/flxbl-io/sfops/commit/2d6a7124a08fc6368c0eaaeb972042ca77c4033b))
* support for branches ([45f4cdc](https://github.com/flxbl-io/sfops/commit/45f4cdc45cc9574e5447cea2d91e515f45de47eb))
* switch trigger during forcetest ([6ad66a0](https://github.com/flxbl-io/sfops/commit/6ad66a00f0c0538533c89b7e6ca4cce763062f34))
* temporarily comment out actionlint ([b4a99ab](https://github.com/flxbl-io/sfops/commit/b4a99ab36e0f709ec5c7cb5a5f4778ca4c649f1c))
* **testrun:** push test run into testorgs ([09c3bf6](https://github.com/flxbl-io/sfops/commit/09c3bf6659c0c2d948e223583d85e231636b3e7b))
* **tests:** add a build state ([223e072](https://github.com/flxbl-io/sfops/commit/223e072283529777cb3bf2c6f29b4cd57040de5d))
* udpated dependencies ([bee4e51](https://github.com/flxbl-io/sfops/commit/bee4e51a866806b5b10c17af5d850cb002da4503))
* update async handling of dev sandbox ([bc0577a](https://github.com/flxbl-io/sfops/commit/bc0577aad52b759764ecce4ad18a76e294b3fad3))
* update deployment failure ([e0456a3](https://github.com/flxbl-io/sfops/commit/e0456a309c5e590895487f2beced3f1ee0bf9081))
* update how branches are written ([1977d64](https://github.com/flxbl-io/sfops/commit/1977d6435e702d204a510d6c86cf6c8bf8c9d0e6))
* update incorrect EoF ([5cd7a9f](https://github.com/flxbl-io/sfops/commit/5cd7a9f360d0caded508459f97b45b073b35512c))
* update incorrect node call ([f5ac6a8](https://github.com/flxbl-io/sfops/commit/f5ac6a8faf4a1810c80d488cce0269390e57a567))
* update inUse and InProgress more accurately ([26e8f1a](https://github.com/flxbl-io/sfops/commit/26e8f1ab9c2d9820da80fb80db2eb7e7bf8f01a4))
* update lock description ([cd02002](https://github.com/flxbl-io/sfops/commit/cd02002b56008f16d04f017ed4ba90829593dfe7))
* update script location ([97be0cd](https://github.com/flxbl-io/sfops/commit/97be0cd322cc67696204b7c7a18c4747b585d6ef))
* update status to denote what if failed ([33d57bd](https://github.com/flxbl-io/sfops/commit/33d57bda909a9ee0c01b450436395ac96119a1a6))
* update to pool tag ([022701b](https://github.com/flxbl-io/sfops/commit/022701b230d072f31322dd91360a2746823ddca4))
* update to sandboxname ([2e858b5](https://github.com/flxbl-io/sfops/commit/2e858b5237177dd6643b471e180cb04ac904c8bc))
* update with dependencies ([bdadbe1](https://github.com/flxbl-io/sfops/commit/bdadbe129cd6278b182a529e70c9f3d63783c512))
* updated cancelled ([fb1609a](https://github.com/flxbl-io/sfops/commit/fb1609a7ae2671ccdabc3615899d173b6fcb325b))
* updates to expiry sandbox ([06d4728](https://github.com/flxbl-io/sfops/commit/06d472879d02f51b13c4f2d35077d41d71bf188e))
* use always to pr-validate ([9484a08](https://github.com/flxbl-io/sfops/commit/9484a088c9d901934eea8f27357ef554fc24083b))
* use branch while fetching ([9b08654](https://github.com/flxbl-io/sfops/commit/9b0865459204503f24029e755e244b60829b4ff3))
* use conditional to use same job ([56ec70c](https://github.com/flxbl-io/sfops/commit/56ec70c42d71f06c3257c3a4a1c2e67489dadaac))
* use correct env vars ([fa8293e](https://github.com/flxbl-io/sfops/commit/fa8293e9443e195a2653e87b1333c102b189935c))
* use correct token var ([f2ee7e9](https://github.com/flxbl-io/sfops/commit/f2ee7e965ea645a2a182d4a821d5b9cb78aa7888))
* use NPM token temporarily ([809e443](https://github.com/flxbl-io/sfops/commit/809e443ef507963d38ce0d7fe4bace8cbd65bdab))
* use of correct description filter ([588ead1](https://github.com/flxbl-io/sfops/commit/588ead1dc7a64f1026a3eba8c299e70c888619c7))
* use of correct var in gh token ([60c9202](https://github.com/flxbl-io/sfops/commit/60c9202d37ef171c6fc3c0de61df10329da11425))
* use PR api to fetch details ([958e8ef](https://github.com/flxbl-io/sfops/commit/958e8ef903dba13b55aa4d245b0785982c593c24))
* use pr user login ([c347c5c](https://github.com/flxbl-io/sfops/commit/c347c5c6cf6d0369326713fe703c3563f10fdb5d))
* use refreshed token in always ([19691c8](https://github.com/flxbl-io/sfops/commit/19691c892aebed7a9595957e3e6e3474b3260584))
* use sf instead of sfdx ([451b2dd](https://github.com/flxbl-io/sfops/commit/451b2ddf3a9b9c23b455b8ec2cf9d7a82f9f2f0c))
* use updated findReleaseDefn ([f25a851](https://github.com/flxbl-io/sfops/commit/f25a8517649ac59112bbfb4de06c5977e3d2c375))
* validate need app token ([585ea15](https://github.com/flxbl-io/sfops/commit/585ea155d91afe18d5195f18c9fe87d4cd0bdfbc))
* variable name incorrect expansion ([744a9b2](https://github.com/flxbl-io/sfops/commit/744a9b27c4e371e66b65872190922b89b9b5f0a5))
* variable semantics on jira ([3815231](https://github.com/flxbl-io/sfops/commit/3815231ebfd6634d84c242e643120cf1655dc08b))
* workflow name ([8e946d4](https://github.com/flxbl-io/sfops/commit/8e946d40a6885916721d61b70e091bce78d1bee9))
* **workflow:** fix incorrect syntax ([6b97a28](https://github.com/flxbl-io/sfops/commit/6b97a289bd80907c117d01cdd3b796016fad9548))
* **workflows:** add an explict token ([0620a23](https://github.com/flxbl-io/sfops/commit/0620a234a629f58462ddedc94cc4c82deafefde9))
* **workflows:** add release- to triggers ([f1e022a](https://github.com/flxbl-io/sfops/commit/f1e022aaffaf5fe7b320e348aaf1d6a171615b86))
* **workflows:** fix typo with dashboard repo var ([e72b49f](https://github.com/flxbl-io/sfops/commit/e72b49f641c83ca4bd1bbfd6ffa0eaab72d141ef))

## Changelog
