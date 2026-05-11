import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import path from 'path';
import affiliateRoutes from './routes/affiliateRoutes';

const app = express();
const PORT = 3000;

// Handlebars setup
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    ifeq(a: string, b: string, options: { fn: Function; inverse: Function }) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
  },
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/affiliates', affiliateRoutes);
app.get('/', (_req, res) => res.redirect('/affiliates'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
