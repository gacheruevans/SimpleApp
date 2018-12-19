//Instead of using Parcel through CLI we shall use the middleware provided by parcel with express
import Bundler from 'parcel-bundler';

//use parcel bundler
if (process.env.NODE_ENV !== 'production') {
    const bundler = new Bundler('./src/index.js',{
        outDir: 'public/js',
        watch:true,
    });

    bundler.bundle();

    app.use(bundler.middleware());
}

//logger
app.use(logger('combined'));