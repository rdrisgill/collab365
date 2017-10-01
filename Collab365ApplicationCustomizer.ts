import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, 
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'Collab365ApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset'; 

const LOG_SOURCE: string = 'Collab365ApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICollab365ApplicationCustomizerProperties {
  // RD
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class Collab365ApplicationCustomizer
  extends BaseApplicationCustomizer<ICollab365ApplicationCustomizerProperties> {
  
  // RD
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // RD
    // Added to handle possible changes on the existence of placeholders.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();

    return Promise.resolve<void>();
  }

  // RD
    private _renderPlaceHolders(): void {

      // Handling the top placeholder
      if (!this._topPlaceholder) {
    this._topPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose });

    // The extension should not assume that the expected placeholder is available.
    if (!this._topPlaceholder) {
      console.error('The expected placeholder (Top) was not found.');
      return;
    }

    var dateObj = new Date();
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();
    var dispalyDay = dateObj.getDay();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        



      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="ms-fontColor-white  ${styles.top}">

              <div class="ms-Grid" style="width: 100%;">
                <div class="ms-Grid-row">
                  <div class="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg6"> ${weekday[dispalyDay]} - ${monthNames[month]} ${day}, ${year}     &nbsp; &nbsp; &nbsp; &nbsp;     <i class="ms-Icon ms-Icon--PartlyCloudyDay" aria-hidden="true"></i>   &nbsp; H87° L74 °</div>
                  <div class="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg6 ms-u-textAlignRight"><a href="#">HR App</a>  |  <a href="#">Phone Book</a> |  <a href="#">Departments</a>  |  <a href="#">Tools</a>  |  <a href="#">Sitemap</a>  |  <a href="#">Interanet Help</a><i class="ms-Icon ms-Icon--Headset" aria-hidden="true"></i> 
                  </div>
                </div>
              </div>                      

            </div>
          </div>`;
      }

      }

      // Handling the bottom placeholder
      if (!this._bottomPlaceholder) {
    this._bottomPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose });

    // The extension should not assume that the expected placeholder is available.
    if (!this._bottomPlaceholder) {
      console.error('The expected placeholder (Bottom) was not found.');
      return;
    }



      if (this._bottomPlaceholder.domElement) {
        this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="ms-bgColor-themeDark ms-fontColor-white ms-font-s-plus  ${styles.bottom}">
              © 2017 Randy Drisgill — All Rights Reserved.
            </div>
          </div>`;
      }

      }
    }
  
  // RD
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }    

}
