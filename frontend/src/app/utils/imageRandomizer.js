import pic1 from '../../images/randomize/avs-preds.jpg';
import pic2 from '../../images/randomize/kessler.jpeg';
import pic3 from '../../images/randomize/sens-leafs.jpeg';
import pic4 from '../../images/randomize/marchand.jpeg';
import pic5 from '../../images/randomize/crosby.jpg';
import pic6 from '../../images/randomize/bruins-avs.avif';
import pic7 from '../../images/randomize/malkin.jpeg';
import pic8 from '../../images/randomize/mcdavid-crosby.jpeg';
import pic9 from '../../images/randomize/mcdavid-matthews.jpeg';
import pic10 from '../../images/randomize/mcdavid.jpeg';
import pic11 from '../../images/randomize/rangers.webp';
import pic12 from '../../images/randomize/rangers-flyers.webp';
import pic13 from '../../images/randomize/wild-panthers.jpg';
import pic14 from '../../images/randomize/tampa-avs.jpg';
import pic15 from '../../images/randomize/karlsson.jpeg';

export const getRandomImage = () => {
    const images = [
        pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15
    ]

    var ind = Math.floor(Math.random() * images.length);

    return images[ind];
}