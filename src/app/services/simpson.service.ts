import { Injectable } from '@angular/core';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class SimpsonService {
  quotes: Quote[] = [
    {
      quote: 'A la grande le puse Cuca.',
      author: 'Homero Simpson',
    },
    {
      quote: '¡¿Alguien quiere pensar en los niños?!',
      author: 'Helena Alegría',
    },
    {
      quote:
        'Tiene todo el dinero del mundo, pero hay algo que no puede comprar… Un dinosaurio.',
      author: 'Homero Simpson',
    },
    {
      quote: '¡No vives de ensalada!',
      author: 'Homero, Bart & Marge Simpson',
    },
    {
      quote:
        'El alcohol: la causa y la solución de todos los problemas de la vida.',
      author: 'Homero Simpson',
    },
    {
      quote: 'Sin televisión y sin cerveza Homero pierde la cabeza.',
      author: 'Homero Simpson',
    },
    {
      quote: '¿Te acuerdas de Alf? ¡Volvió! ¡En forma de fichas!',
      author: 'Milhouse Van Houten',
    },
    {
      quote: 'Vas a morir, Moe. Wiiiiiii',
      author: 'Homero Simpson',
    },
    {
      quote: '¿Dónde está mi hamburguesa?',
      author: 'Homero Simpson',
    },
    {
      quote: 'Es como si no llevara nada puesto ...nada puesto ...nada puesto.',
      author: 'Ned Flanders',
    },
    {
      quote:
        '¡Momento! ¿La maestra de Bart se apellida Krabappel? ¡Yo le decia Clavados! ¿Por que nadie me lo dijo?, Debo haber parecido un idiota!',
      author: 'Homero Simpson',
    },
    {
      quote: '¿Qué te pasó, viejo? Antes eras chévere.',
      author: 'Bart Simpson',
    },
    {
      quote: 'No lloren por mí. Ya estoy muerto.',
      author: 'Barney Gómez',
    },
    {
      quote: 'Es mi primer día.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Sin la presencia de un hombre en la casa puedes volverte afeminado en un segundo. Ay, esta grasa no se quita.',
      author: 'Homero Simpson',
    },
    {
      quote: 'Les traigo paz.',
      author: 'Montgomery Burns',
    },
    {
      quote:
        'Niños: Hicieron su esfuerzo y fracasaron miserablemente. La lección es: nunca se esfuercen.',
      author: 'Homero Simpson',
    },
    {
      quote: 'En un momento así, solo se puede reír.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Siempre dudé de la existencia de Dios. Ahora sé que existe, soy yo.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Me gusta la cerveza fría, la tele fuerte y los homosexuales locas, locas si',
      author: 'Homero Simpson',
    },
    {
      quote: 'Plan dental... Lisa necesita frenos.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Ahora vamos a solucionar nuestros problemas con un gran platón de helado de vainilla.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Mi Homero no es comunista. Podrá ser mentiroso, puerco, idiota, comunista, pero nunca una estrella de porno.',
      author: 'Abe Simpson',
    },
    {
      quote:
        'El matrimonio es igual que una naranja. Primero está la piel, luego la dulce, dulce pulpa.',
      author: 'Homero Simpson',
    },
    {
      quote: 'Hable más fuerte que tengo una toalla.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Lisa, los vampiros son seres inventados, como los duendes, los gremlins y los esquimales.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Normalmente no rezo, pero si estás ahí­, por favor, ¡sálvame Superman!',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Los viejos no necesitan amor, tienen que ser aislados y estudiados para ver qué nutrientes se les pueden sacar para nuestro beneficio personal.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Trabajo mucho y quiero a mis hijos, ¿por qué voy a pasar la mitad del domingo oyendo que me voy a ir al infierno?',
      author: 'Homero Simpson',
    },
    {
      quote:
        'No vayas a decir que es un bar ¿Pero qué más abre a esa hora? Es una tienda de pornografía, estaba comprando pornografía. Jejejeje, que buenas ideas tengo.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Yuju, ya soy universitario. ya no necesito el diploma de la escuela secundaria. Soy intelectual, muy inteligente. Soy intelectual, muy inteligente, hay que bonito soy.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Bart no quiero asustarte pero tal vez el Coco, el Coco esta en la casa.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Tres pequeñas frases que te ayudarán a lo largo de tu vida: la primera ¡Cúbreme!, la segunda ¡Buena idea Jefe!, y la tercera; Estaba así cuando llegué.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Si yo me muriera, reencarnarí­a en mariposa, nadie sospecharí­a de una mariposa.',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Familia, amistad y religión, tres demonios a destruir si quieres triunfar en los negocios.',
      author: 'Mongomery Burns',
    },
    {
      quote:
        'Mira, sea o no sea científicamente real, el alma es el símbolo de todo lo bueno que hay en nosotros.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'Bart, como nunca recibí palabras de ánimo, no estoy muy segura de cómo deben sonar pero aquí va, yo creo en ti.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'Su vida fue tuvo éxitos desenfrenados hasta que se dio cuenta que era un Simpson.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'No sé muy bien quién es Dios, sólo sé que es más poderoso que papá y mamá juntos.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'Hoy no va a llegar el fin del mundo, tan solo 100 años más de calentamiento global y ¡adiós!',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'Antes de cantar el himno nacional me gustaría decir que el fútbol utiliza mal recursos que podrían servir para la educación y las artes.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        '¿No deberíamos atacar las raíces de los problemas sociales en vez de atestar las prisiones del país?',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'Pueden aceptar la ciencia y enfrentar la realidad o pueden creer en ángeles y vivir en un mundo infantil de fantasías.',
      author: 'Lisa Simpson',
    },
    {
      quote: 'De la sociedad aprendí que es mejor ponerse los audífonos.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        'La policía sólo sirve para mantener el status quo de las clases dominantes.',
      author: 'Lisa Simpson',
    },
    {
      quote: '¡Bart, deja de molestar a Satanás!',
      author: 'Marge Simpson',
    },
    {
      quote: 'No puedes esconderte de mí, paso 23 horas diarias aqui.',
      author: 'Marge Simpson',
    },
    {
      quote: 'Yo creía que buscarse en Google significaba otra cosa.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Homero, me dijiste que no ibas a usar al muñeco para fingir tu muerte.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Mmm... quiero nena pero no puedo (hablar con Homero por su plan de engordar para no ir a trabajar). Tu padre es muy sensible a veces ¿Recuerdas cuando me reí de su gorra de Sherlock Holmes? Lloró una semana y cerró su agencia de detectives...',
      author: 'Marge Simpson',
    },
    {
      quote:
        '¿Sabes, Lisa? Cuando conocí a tu padre era soéz, vulgar y cochino. Pero ahora es una persona diferente... (Lisa: ¡Pero mamá....!) ¡Es una persona diferente, Lisa!.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'A veces siento que la familia me vuelve loca ¡y quiero estallar! .',
      author: 'Marge Simpson',
    },
    {
      quote: 'Si ambicionas poco, nadie te estorbará.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Haz como decía mi madre: No hables, no digas nada, no llames la atención y sé fuerte.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'El mundo va mucho mejor ahora que los científicos han inventado la magia.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'El mundo va mucho mejor ahora que los científicos han inventado la magia.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Oye, Otto, ¡tengo un examen hoy y no estoy listo! ¿Podrías estrellar el autobús o algo?',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Aw, vamos papá, este puede ser el milagro que salve la navidad de los Simpsons. Si la TV me ha enseñado algo es que los milagros les pueden suceder a niños pobres en navidad. Le pasó al pequeño Tim, le pasó a Charlie Brown, le pasó a los pitufos y ¡también a nosotros!',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Damas y caballeros, al contrario de lo que acaban de ver, la guerra no es glamorosa ni divertida. No hay ganadores, solo perdedores. No hay guerras buenas, salvo las siguientes excepciones: la Revolución Norteamericana, la Segunda Guerra Mundial y la trilogía de Star Wars.',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Si yo me muriera, reencarnarí­a en mariposa, nadie sospecharí­a de una mariposa.',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Oye, Otto, ¡tengo un examen hoy y no estoy listo! ¿Podrías estrellar el autobús o algo?',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Lisa, tu tienes la inteligencia para llegar hasta donde quieras. Y cuando llegues, yo estaré contigo para pedirte prestado.',
      author: 'Bart Simpson',
    },
    {
      quote: '¿Qué te paso Viejo? Antes eras chévere',
      author: 'Bart Simpson',
    },
    {
      quote:
        'Su nombre es Gordov, la mascota oficial de los próximos juegos invernales, representa el espíritu ruso de pereza y alcoholismo..... ',
      author: 'Bart Simpson',
    },
    {
      quote:
        '¡Milhouse, ¿como es que alguien que usa lentes puede ser tan tonto?!',
      author: 'Bart Simpson',
    },
    {
      quote: 'Vive deprisa, muere joven y deja un cadáver obeso.',
      author: 'Bart Simpson',
    },
    {
      quote:
        '"Viagra 5 dólares la pildora". Sea lo que sea, irá directo al café de Skinner.',
      author: 'Bart Simpson',
    },
    {
      quote:
        '¿Cuándo voy a aprender? La solución a todos los problemas de la vida no está en el fondo de una botella. ¡Está en la TV!',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Los viejos no necesitan amor, tienen que ser aislados y estudiados para ver qué nutrientes se les pueden sacar para nuestro beneficio personal.',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Hay algo peor que ser un perdedor, es ser uno de esos tipos que se sienta en un bar, contando la historia de cómo se convirtió en un perdedor y no quiero que eso me pase a mí',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Trabajo mucho y quiero a mis hijos, ¿por qué voy a pasar la mitad del domingo oyendo que me voy a ir al infierno?',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'No vayas a decir que es un bar ¿Pero qué más abre a esa hora? Es una tienda de pornografía, estaba comprando pornografía. Jejejeje, que buenas ideas tengo.',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Yuju, ya soy universitario. ya no necesito el diploma de la escuela secundaria. Soy intelectual, muy inteligente. Soy intelectual, muy inteligente, hay que bonito soy.',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Voy por la escopeta. Bart no quiero asustarte pero tal vez el Coco, el Coco esta en la casa.',
      author: 'Homero Jay Simpson',
    },
    {
      quote:
        'Lisa, tu tienes la inteligencia para llegar hasta donde quieras. Y cuando llegues, yo estaré contigo para pedirte prestado.',
      author: 'Bart Simpson',
    },
    {
      quote: 'Vive deprisa, muere joven y deja un cadáver obeso.',
      author: 'Bart Simpson',
    },
    {
      quote: 'No puedes esconderte de mí, paso 23 horas diarias aqui.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Homero, me dijiste que no ibas a usar al muñeco para fingir tu muerte.',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Tu padre es muy sensible a veces ¿Recuerdas cuando me reí de su gorra de Sherlock Holmes? Lloró una semana y cerró su agencia de detectives...',
      author: 'Marge Simpson',
    },
    {
      quote:
        'Su vida fue tuvo éxitos desenfrenados hasta que se dio cuenta que era un Simpson.',
      author: 'Lisa Simpson',
    },
    {
      quote:
        '¡Oh, no! ¡Elecciones! ¿Es uno de esos días en que cierran las tabernas, no es cierto?',
      author: 'Barney Gómez',
    },
    {
      quote:
        '¡La academia me odia, son una banda de dinosaurios, saben menos de television que de los pelos que tienen en las ... eh, hooooolaaaa!',
      author: 'Krusty',
    },
    {
      quote: '¡Ahhhh, Marge, no te voy a mentir!… ¡Adios!',
      author: 'Homero Simpson',
    },
    {
      quote: '¿Un Gym?¿Qué es un gym? ¡Ah, un gym!',
      author: 'Homero Simpson',
    },
    {
      quote:
        'En mi familia somos 5 personas: Marge, Bart, la niña Bart, la que nunca habla y el tipo gordo, cómo lo desprecio',
      author: 'Homero Simpson',
    },
    {
      quote: '¡Jaque mate doña cama elástica!',
      author: 'Homero Simpson',
    },
    {
      quote: '¡Que elegancia la de Francia!',
      author: 'Homero Simpson',
    },
    {
      quote: 'Y todo se lo debo a este simpático felino.',
      author: 'Homero Simpson',
    },
    {
      quote: '¡No se rían de mi, pueden tener un hijo igual',
      author: 'Homero Simpson',
    },
    {
      quote: 'Lisa lloró, yo lloré y Maggie rió. Todo fue una confusión.',
      author: 'Homero Simpson',
    },
    {
      quote:
        'Marge, niños, les prometo que todo va a salir bien. Vayan arriba, empaquen sus maletas. Vamos a comenzar una nueva vida… Bajo el mar.',
      author: 'Homero Simpson',
    },
    {
      quote: '¿Ah, si? ¿Y si era tan listo por qué se murió?',
      author: 'Homero Simpson',
    },
    {
      quote: 'Disimula y ve despacio hacia el pastel.',
      author: 'Homero Simpson',
    },
  ];

  getOne(): Quote {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }
}
