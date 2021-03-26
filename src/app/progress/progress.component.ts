import { AfterContentChecked, AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ProgressHelperService } from './progress-helper.service';
import { ProgressStepComponent } from './progress-step/progress-step.component';
import { Status, UiHelper } from './uiHelper';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent extends UiHelper implements OnInit, AfterContentInit {

  itemLength: number;

  @Input() public set selectedIndex(value){
    this.activeIndex = value || 0;
  }

  @ContentChildren(ProgressStepComponent) public steps: QueryList<ProgressStepComponent>;


  constructor(protected progressHelper: ProgressHelperService) {
    super(progressHelper);
   }

  ngOnInit(): void {
    this.progressHelper.eventHelper.subscribe({
      next: ({prev, next}) => {
        if(next){
          this.next();
        }

        if(prev){
          this.prev();
        }
      }
    })
  }

  public prev(){
    this.decreaseStep();
  }

  public next(){
    this.increaseStep();
  }

  decreaseStep(){
    if(this.activeIndex === this.itemLength - 1 && this.itemProgressList[this.activeIndex].status === Status.COMPLETED){
      this.undoLastComplete();
    }else{
      if(this.activeIndex > 0){
        this.activeIndex--;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveStep(this.activeIndex);
      }
    }
  }

  increaseStep(){
    if(this.activeIndex === this.itemLength - 1 && this.itemProgressList[this.activeIndex].status !== Status.COMPLETED
      ){
        this.completeLastStep();
      }

      if(this.activeIndex < this.itemLength - 1){
        this.activeIndex++;
        this.switchStatusNext(this.activeIndex);
        this.setActiveStep(this.activeIndex);
      }
  }

  ngAfterContentInit(){
    this.initProgress(this.progressSteps.length);
    this.setActiveStep(this.activeIndex);
    this.initStepIndex();
  }
  
  private setActiveStep(activeIndex: number) {
    if(this.stepsExist){
      this.removeActiveStep();
      this.updateActiveStep(activeIndex);
    }
  }

  removeActiveStep() {
    this.progressSteps.map((step) => {
      if(step.isActive){
        step.isActive = false;
      }
    })
  }

  updateActiveStep(index: any) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private initStepIndex(){
    this.progressSteps.forEach((step, i) => (step.stepIndex = i));
  }

  public get activeStep(): ProgressStepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get progressSteps(): ProgressStepComponent[]{
    return this.steps.toArray();
  }

  private get stepsExist(): boolean{
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private initProgress(value): void{
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }

  private generateProgressArray(length: number): { stepIndex: number; status: string; }[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING
      }
    })
  }

}
