import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {ButtonComponent, SectionComponent, TagComponent} from '.';
import eventAPI from '../apis/eventApi';
import {appColors} from '../constants/appColors';
import {Category} from '../models/Category';

interface Props {
  isFill?: boolean;
  onFilter?: (id: string) => void;
}

const CategoriesList = (props: Props) => {
  const {isFill, onFilter} = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState('');

  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categorySelected && onFilter) {
      onFilter(categorySelected);
    }
  }, [categorySelected]);

  const getCategories = async () => {
    const api = `/get-categories`;

    try {
      const res = await eventAPI.HandleEvent(api);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCategory = async (item: Category) => {
    if (!onFilter) {
      navigation.navigate('CategoryDetail', {
        id: item._id,
        title: item.title,
      });
    } else {
      setCategorySelected(item._id);
    }
  };
  const data = [
    {
      iconColor:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG8SURBVHgBnZRBTsJAFIbfG0BZcgRWpiCJcAM4gXIC6sYE2HAD4AZstHEFNzCcADmBJCKQuLDegJ2USJ/zWkbaOhTwX7TT6czX//W9NwhSxvTeRCHa5EBlUarbcISMFyuL59D/ctJVu3S7VPOCLxJWkzdeMOKFR8JGAPTJsOAesb2riYPQAGw8zzfM/Nzqs1P1HvmSm1kfASjL1oWvgxFBmRAqSHhNDg19hy4NI0a0Tn0YfxivgjAZaA3J7YiUm/GAlMAeu4qDGq9WGXZRFCXM/E4mqgwT7qYFRJVZoTnB33DmMhxSDkLywscEFSGJTyHHRH52tzAeqqTAIle3fft6p7TBiXTVhagCsBDwGCisYaCgBPAchXmuQaND4a8gvQwWc1BCN3nIaRpWGdijPQ4fa/7IHcc51bUp6mCypgY8JhSmD6UbTgomPHgsFPfBlGStld4v7rwfb0wteYjs2kwHFXEw+dxVMNaiUB9ESudPR2EcbHbZ7IBGxpvVQYS2zimeClPKTR8GILAWhQpu6lNhrHmhYcpkBYs6iylqif/AlM7WTqhWCXGJXldsqCXTY8szrgcnSu1n2Gqd7v0AiJskYb3PYY4AAAAASUVORK5CYII=',
      iconWhite:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACmSURBVHgBlZHREYNACEQpxRIs4TrBEuwgdhA7SDpKCZZgCQRm1kgYTpKd4Qd5zzuOSCMimxZTEZ25aTXfGOQMF+BTa/zMBTgVBPAFppE7dioAaLk78KG1HANm3DMBAHGCE3R/SAU2GHpLbylXgk1rpuI5ulcoA/h/AY4o2LAJ5rAwrsAjI/qDfD8lV+AUvueCCqT+Ipl+AZ2gudndGiuMl6ATTIDXNya76BBmkL1dAAAAAElFTkSuQmCC',
      color: '#29D697',
      key: 'food',
    },
    {
      iconColor:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJSSURBVHgBhZRBVtswEIZnFPNeSxe1C+06nKDJDegO0o0fbbpNOAFwAsJJkmxLaN1Nkl2dEzScAHfbRyErymsc/YzkJJjYJlrYepLm0+ifX2LKabf+rksbLxsA+SAeKaZA+r9kaiz/sSL88C4GQV4sZ2D1/SNAtYjgzocmb3p976ZeuyJQORUZ8VR/8IJhVAi8Pqg1laJ2ZleeVjWcYyZuZOZivZOGqmVmXz42tr/1OxrorgbFKLkEnqyOa6ZDm8inff8J0B5To/O3XmtvXwyaedA8WGmqQ2yon4q5fevvlS3QdET4Y5s+qJkHdeL7MTPe58Hmurq6pE4tI083MHW2zvuHcpROyWwz02dw1FUBLKXnnecohcZqseeZkkCb1kLO5tE6mGmzjU1fAXwp/YzgDJSNHF4QTmbAzjqYjdGocBI0jP7UaxWGdheaJeK9OtUM1xzfap3AXIi+IArBmCSbsytn9KUT8c3nmszJDSBEGvRbEb+WAkgGqmLMnWR2F5hMrw/2miV9H5DzohKDfbPWVlZhTMCl1xuGnLkBqZY+JrNueV+H3SLz22ISnYmGGK2D2aX/aWQMXGR+G0M6VJrQeRYm2bPmkBwqi4G/F5pf9HsrR1bmIxmERTAzFrPuaig/ics3v+jesnomAXxSBEtl4D52V6CSndF3CXx33h+bV2Odz57yH6E8/VddjC9fG+PFWYkrcu/cTDCrsvzGOdDKwvwZoGmyW8DxrIoVwc0NkOKlgRNjEXl4q88+sOlmdjYZy4JdWYWt3uDEGBuKoqSQ+e0BXPiSn/nAaWMAAAAASUVORK5CYII=',
      iconWhite:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADwSURBVHgBlVNtFcIwDGx5CJgDKmESwAEONhzgABwgAVAyCQMFq4PNQchB8hZG84N772ho89Fc1hAWIKKW2THPzCNzlP9N8MCHidnTjFH2LAbsacxKA3kBK5OvcuokmyBIRnArqyItqup5b3ssOahNTuImiBhUSLBn3pxAoEPPT+ZkelL7wdwwD8yraGJRR/qMAAmyiASnFoExxh0qyNld1kl86iAjIefqnYgGeznGy0quZ5HNVfO7wu/oKq3sqU0F5YcvtWVcPf0358F+JInK40iOFglxa/ywqpk3goPJ9As7w7/oSfOrgqJ4VSdyXtULMcXwJx/B1k0AAAAASUVORK5CYII=',
      color: '#EE544A',
      key: 'sports',
    },
    {
      iconColor:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANTSURBVHgBzVbNTxNBFJ83U/oFAcqHBK2xRGMMpyYkJpxsPXvoBa5wJMTExgvqqSfQk5AUEi9yNSFK+QssfwCJJ84cSDhIKI2W0q95vrc7W9uyQEsx8SW/7NuZnff7vbdvZhfELVoymRs891WjEkQCpJxbXx4ONc57RJfGBOWgmAPERAV0VAk52DiPiMBXAMAbkS0s/YxJ5XlGBDEiiNnRXB91iKybtskWlnIRCdUkl4duSb2+jKCJLB6Py1QqpQntZyZVjTKQr0RnJrPZrDK+luLfGoTDYSa0/K4bpMkQswgqI0QtDwI2meDw8JATsgreLdkpMWRQi13vucqsroZOeZAbSKl62zAZ3ogMURwI1DsSRSb9YTTbzhLn2hkZlWljZSTeyQoDzvB23pldNtoSCBEBeIAad1sILeua7OXb4wQCbFs3YMcFCfOtRFeSWceQv5ZgX6PKUoe5PqcBPl6/t69okMV3uWhF6O/UvtY5p/i0EOKHsLqvQVAqN1gp64i43iw90m2Q9HJZBlumoq0RVlNWq58KN0NkcTA+Pl4fkn/n7PLyyybGiGjTEPWa2zgI3OHr0dGRvEAm7KyUuDKwyLeObayMpkA0E4LWa2kaNzFFLBaztoC0gyDMzs6yr/wBz4V3Uw8CatttPL08mqzV5ATUdLznTIbS70eTjj6GczZCS1Zewtnim+N5at/NlrSy651taLYeOog909PT5a2trVojGXemj1Bl0ucvPj26/+DpaxQQKhdz3758jn81cxVh7wNWLc06j/EZ2sxXG7LjNbqJbGRkxF8sFnsLhUKf1+sNlstlvwnAD58TfhN+GV+barBAfs7r8/lUqVRiosrAwMBZPp8vTU1NVfb29pgY3coYJFhk9C59drGhSigqpQp+v79wcnJSYvWTk5Nyf3/fqYjHxMFQKFTO5XJOFapGWN1gZmZGRSIRVtgfDAbHKegE+Y8JT0jxw0AgECZ/mNBrArM4Rcp7TGa9Y2NjFsx9D/0K1L9lrebUnzPjDX2HcJdwjzBGZQmZQF4Wxh1s9qY0xB5DrMwYOH9WbgYNhKysjzAwNDTUb/xAQzBwWQuGoH5AuBFcRtpYAue7pJHlArhHu8Zc07TjNf0NolGLAG2c8f+D/QH8DzAsSJ+NdAAAAABJRU5ErkJggg==',
      iconWhite:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADRSURBVHgBlZKBDcIgEEWBOEDdoCN0g7YT2BF0AlfQEZzAuIFOIE6gG5QN2g3wnzkNxSOlP/k5Ajw4jtNqgbz3JcIG7uDHKgNoeDNBZbAkwwC2CDVDReJclbr5rDI0m7agEX7RwGQCDj7BrdZ6jXiZu9nCV/gGwEkbUrAD0MaTKGTFWXyUlTb9L9xj+IQHeD+B6T/hjhsh1kFN/7j6pQ3gjtDwwsgOVQsHKkO3BSBJagonzFkTpZPSLjrgiILa71tjiR3GhSviSSpUDw8E/m1I6A2zk2qk2YVclgAAAABJRU5ErkJggg==',
      color: '#6B7AED',
      key: 'music',
    },
    {
      iconColor:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJdSURBVHgBrZPdcdpQEIV3r0TISyxUQXAH8JAZcCIMHZAKjCsIqQBTgXEF4AqiDgDjAfJkUkHkCoRJHvIj3c3uRRCBhTPJZGeYQdLdT2fPWSH8h6oMwyLa1hA0XdnpB/VhWPhh2++IdAsRlgDKn3ovuk/BXg3DkoEBFAB1gDuwnD0kolK6IR/F7qjhLrNg1ZtVExD6AiOg7txzLtTmYRbsqXp9+/WMYR/SMLlvgCeTL51sGC3S6mSKzXlNemBOpGBSmBj6+YCQJbHRqNgfwJc8/rnxGMgAWMT1vOa0KpOHi98KLasOh6uAClk9FPZhXL7ATm5WfQTsVG9Xl0ZhdbKShLKhREv26XrmOW1pJISWaWIrnkW68d2yOnzR3h6P4mPxMDMIbj6f1RyXIt2Ta410n7wkEJjxFgnTPahUUxTSIxgbDZEeJPtV5F/Ab29Qjht+al/Z9hmfKk29o7fcH4o1BogwUJmjrmH9BCZVVDmr8/GN0xOY+MgqmhIoP1ukWxXLCfb0LZ6DfCW7vmrawHVzM/q84QaplwLF9KA4+vEOjuj+W4avFo8jiqaeU44wLrO/x7KPaaCy8A4rk7COYLxaAzV1EZHHoD4nGPCtMYH2IYIg8VS8GvG5Ov8p7oiRlOeeO5I1SD+Y1Y58STjPaXLKvgL7lGF3iZoi72VrH8a4K7HAxL6nMuC51/8eNR0o9jMf67Ks0naPquOwzSZcwt8WwyjWjSQg2K7N7NTtgY7fwzrhf4LtADdQNrYsH/0fQEtZfhkzDZPCQz1maS2oI6oSp+6sObTgxD9JkIf6fgHXZUxqhHpfoAAAAABJRU5ErkJggg==',
      iconWhite:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADzSURBVHgBjVKBEYIwDCyeAzhCnUDcgA10A9zAEcQJ1AlkBScoG4gTgBPgBjGBB0Ovin/3lKT5pGlqjAcismYCHHNgVtoRi4M6yLr4IRRkQzVmQ2MkAeFpJISz8oSN3wav15BwR2E45h3tOPhynNK1bamNkNgiAWG16pSZCfTaB8VK3Pu2Kq4ygYo6ewU7wX+Ko7eYcdsvdaEFM2Fa2LLKyPbKN0DEpbIfzFjZNXhkrplP5gZ75Zw/N1TrgwUXJC2YDlVrL/E56ueMgByiJXOF4NBLq6MoWhqI9SVNQaZjR6n+TCD7sfkG6l6co8/8G9ipH/sGpMLVe7MbIkQAAAAASUVORK5CYII=',
      color: '#39C3F2',
      key: 'art',
    },
  ];
  const handleUpdateCategories = async () => {
    data.forEach(async cat => {
      const item = categories.find(element => element.key === cat.key);
      if (item) {
        const id = item._id;
        const values = {
          color: cat.color,
          iconColor: cat.iconColor,
          iconWhite: cat.iconWhite,
        };
        const api = `/update-category?id=${id}`;
        try {
          const res = await eventAPI.HandleEvent(api, values, 'put');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return categories.length > 0 ? (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      // ListHeaderComponent={
      //   <>
      //     <SectionComponent>
      //       <ButtonComponent
      //         text="Update categories"
      //         onPress={handleUpdateCategories}
      //       />
      //     </SectionComponent>
      //   </>
      // }
      keyExtractor={item => item._id}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={
            isFill
              ? item.color
              : categorySelected === item._id
              ? item.color
              : 'white'
          }
          onPress={() => handleSelectCategory(item)}
          label={item.title}
          icon={
            <Image
              source={{
                uri: isFill
                  ? item.iconWhite
                  : categorySelected === item._id
                  ? item.iconWhite
                  : item.iconColor,
              }}
              style={{width: 20, height: 20}}
            />
          }
          textColor={
            isFill
              ? 'white'
              : categorySelected === item._id
              ? appColors.white
              : appColors.text2
          }
        />
      )}
    />
  ) : (
    <></>
  );
};

export default CategoriesList;
