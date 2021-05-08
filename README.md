# Affinidi Study Case

This repository is contains study case of Affinidi for Backend Development department. A basic NodeJS app to upload images to AWS S3. It has several features like

* Upload Image To S3
* Retrieve Image URL from S3
* Compress Image
* Convert Extensions (JPG - JPEG - PNG only)

##  Before Starting

Clone the repository:
```
git clone https://github.com/berkinakaydin/affinidi-study.git
cd affinidi-study
```

Download [yarn](https://yarnpkg.com/getting-started/install) package manager. Then run the command below.

```bash
yarn
```

### Envrionment Variables
 
```js
{
  HOST: 'localhost (default)',
  PORT: '8080 (default)',
  REGION: 'eu-west-1 (default)',
  BUCKET_NAME: '<S3 BUCKET NAME>',
  AWS_ACCESS_KEY_ID: '<YOUR ACCESS KEY ID>',
  AWS_SECRET_ACCESS_KEY: '<YOUR SECRET ACCESS KEY>' 
}
```

## Usage

Next, run the following commands to start
```
yarn run start 
```

Simply look up **Swagger Documentation** to find out available endpoints. You can find it on 
```
https://localhost:8080/documentation
``` 

## License
[MIT](https://choosealicense.com/licenses/mit/)

<p align="center">
  :heart: NodeJS :heart:
</p>
