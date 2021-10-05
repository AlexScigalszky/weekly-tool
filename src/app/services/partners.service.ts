import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  partnerCollectionName = `companies/${environment.companyName}/partners`;
  partnerCollection: AngularFirestoreCollection<Partner>;

  constructor(private firestore: AngularFirestore) {
    this.partnerCollection = this.firestore.collection<Partner>(
      this.partnerCollectionName,
    );
  }

  list(): Observable<Partner[]> {
    return this.partnerCollection
      .valueChanges()
      .pipe(tap((x) => console.log(`partners`, x)));
  }

  updateList(): void {
    const data = [
      new Partner('Lago, Gonzalo', new Date('2010/09/01')),
      new Partner('Pagano, Mariela', new Date('2012/02/28')),
      new Partner("Marcelo D'andrade", new Date('2016/09/06')),
      new Partner('Hernán Garat', new Date('2014/04/01')),
      new Partner('Victor Thieme', new Date('2016/09/05')),
      new Partner('Diego Tripodi ', new Date('2016/12/01')),
      new Partner('Anibal Favole ', new Date('2016/11/01')),
      new Partner('Marney Daniela Ruiz Pernía', new Date('2017/11/06')),
      new Partner('Mariana Ortega', new Date('2015/04/24')),
      new Partner('Germán Buchniv', new Date('2005/11/22')),
      new Partner('Tadeo Russo', new Date('2009/06/10')),
      new Partner('Carlos A. Fernández', new Date('2007/07/01')),
      new Partner('Laura Mariani', new Date('2018/01/01')),
      new Partner('Paul Eduardo Marclay', new Date('2018/08/09')),
      new Partner('Luigi Antonio Pocay Baldini', new Date('2019/02/04')),
      new Partner('Jose Arturo Tuesta Condori', new Date('2019/04/03')),
      new Partner('Alex Pablo Scigalszky', new Date('2019/05/30')),
      new Partner('Eduado R. Rodriguez Bracho', new Date('2019/07/08')),
      new Partner('Rodrigo Moises Battagliero', new Date('2019/07/15')),
      new Partner('Carlos Guillermo Ramirez Valero', new Date('2019/08/12')),
      new Partner('Ashtar Merry Márquez Chirinos', new Date('2019/08/12')),
      new Partner('Ivan Daniel Genes', new Date('2019/08/12')),
      new Partner('Celeste Gisel Mazzotta', new Date('2019/12/10')),
      new Partner('Carmen Julia Muñoz Daza', new Date('2019/12/16')),
      new Partner('John Walker Marquez Chirinos', new Date('2019/12/17')),
      new Partner(
        'Lorena Andreina Casabiel D Ambrosio',
        new Date('2020/01/06'),
      ),
      new Partner('Pablo Andres Molinelli', new Date('2020/02/03')),
      new Partner('Pablo E. Fernández', new Date('2020/05/20')),
      new Partner('Nicolás Andrés Litwinchuk ', new Date('2020/04/01')),
      new Partner('Lucio Biancardi ', new Date('2020/04/01')),
      new Partner('Andrea Lilian Martinez Castellano', new Date('2020/05/21')),
      new Partner('Lizandro Zerpa ', new Date('2020/06/01')),
      new Partner('Andrea Joseyn Palmera Yanez', new Date('2020/08/24')),
      new Partner('Soledad Martinez', new Date('2020/08/31')),
      new Partner('Leonardo Alviarez', new Date('2019/08/12')),
      new Partner('Pedro Vilches', new Date('2020/09/21')),
      new Partner('Emiliano Jesús Molina González ', new Date('2020/12/14')),
      new Partner('Carlos Federico Evaristo Bugeau', new Date('2020/12/14')),
      new Partner('Jhonattan Alfonso Millán Alviarez', new Date('2020/12/23')),
      new Partner('Padro Morales', new Date('2021/02/10')),
      new Partner('Viviana Lorena Arancibia', new Date('2021/03/22')),
      new Partner('Jose Antonio Guarecuco', new Date('2021/03/22')),
      new Partner('Emily Solsire Spiritto Lozada', new Date('2021/04/12')),
      new Partner('Matias Buchniv ', new Date('2021/07/01')),
      new Partner('Lucas Daniel Campaner', new Date('2021/06/01')),
      new Partner('Andrés Álvarez ', new Date('2021/06/01')),
      new Partner('Franco Javier Gomez Lisardia', new Date('2021/06/14')),
      new Partner('María Sol Mercedes Ariaca', new Date('2021/06/14')),
      new Partner('Andrés Lanzi', new Date('2021/06/14')),
      new Partner('Fabricio Adrian Di Gennaro', new Date('2021/07/02')),
      new Partner('Christian Pedro Coriasco ', new Date('2021/07/19')),
      new Partner('Sergio Daniel Risposi', new Date('2021/08/02')),
      new Partner('Tomás García', new Date('2021/08/02')),
      new Partner('Eduardo Piñeiro', new Date('2021/08/30')),
      new Partner('Juan Torrent', new Date('2020/08/10')),
    ];

    // this.list()
    //   .pipe(take(1))
    //   .toPromise()
    //   .then((ps) => {
    //     ps.forEach((p) => {
    //       this.firestore
    //         .doc(`${this.partnerCollectionName}/${p.id}`)
    //         .delete()
    //         .catch((error) => {
    //           console.log(error);
    //         })
    //         .then(() => console.log(`Deleting partner (${p.id})`));
    //     });
    //   });

    data.forEach((e) => {
      this.add(e);
    });
  }

  add(partner: Partner): void {
    const id = this.firestore.createId();
    partner = {
      ...partner,
      id,
    };
    this.partnerCollection.doc(id).set(partner);
  }
}
